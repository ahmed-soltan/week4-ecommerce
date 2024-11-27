import Quill, { QuillOptions } from "quill";
import { Delta, Op } from "quill/core";

import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import "quill/dist/quill.snow.css";
import StarRating from "@/features/product/components/reviews/star-rating";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MdSend } from "react-icons/md";

type EditorValue = {
  comment: string;
  rating: number;
};

interface EditorProps {
  placeHolder: string;
  onSubmit: ({ comment }: EditorValue) => void;
  variant?: "create" | "update";
  onCancel?: () => void;
  defaultValues?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  rating?: number;
}

const Editor = ({
  placeHolder,
  onSubmit,
  variant = "create",
  onCancel,
  defaultValues = [],
  disabled = false,
  innerRef,
  rating: ratingNumber,
}: EditorProps) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(ratingNumber || 0);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeHolderRef = useRef(placeHolder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValues);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    disabledRef.current = disabled;
    submitRef.current = onSubmit;
    placeHolderRef.current = placeHolder;
    defaultValueRef.current = defaultValues;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeHolderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();

                const isEmpty =
                  text.replace(/<(.|\n)*>?/g, "").trim().length === 0 ||
                  rating === 0;

                if (isEmpty) return;

                const comment = JSON.stringify(quill.getContents());
                submitRef.current({ comment, rating });

                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getLength() - 1, "\n\n");
                return false;
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();
    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const isEmpty =
    rating === 0 || text.replace(/<(.|\n)*>?/g, "").trim().length === 0;

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <StarRating
        onChange={(rating: number) => setRating(rating)}
        value={rating}
      />
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white w-full",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {variant === "update" && (
          <div className="ml-auto flex items-center gap-x-2">
            <Button
              disabled={disabled}
              onClick={onCancel}
              size={"sm"}
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  comment: JSON.stringify(quillRef.current?.getContents()),
                  rating,
                });
              }}
              size={"sm"}
              className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      {variant === "create" && (
        <Button
          disabled={disabled || isEmpty}
          variant={"destructive"}
          size={"lg"}
          onClick={() => {
            onSubmit({
              comment: JSON.stringify(quillRef.current?.getContents()),
              rating,
            });
          }}
          className={cn("w-full h-10 text-white")}
        >
          Add Review
        </Button>
      )}
    </div>
  );
};

export default Editor;
