import React from "react";
import {
  isSlateConfigChildren,
  isSlateConfigNode,
  JsonTextSlateConfigChildren,
  JsonTextSlateConfigNode,
} from "../../../types/design.types.js";

interface TextSpanProps {
  node: JsonTextSlateConfigChildren | JsonTextSlateConfigNode;
}

export const TextSpan: React.FC<TextSpanProps> = ({ node }) => {
  if (isSlateConfigChildren(node)) {
    const style: React.CSSProperties = {
      color: node.color,
      textDecoration: node.textDecoration ?? "none",
      textTransform: node.textTransform,
      ...(node.fontSize && { fontSize: `${node.fontSize}px` }),
      ...(node.fontSettings?.fontWeight && {
        fontWeight: node.fontSettings.fontWeight,
      }),
      ...(node.fontSettings?.fontStyle && {
        fontStyle: node.fontSettings.fontStyle,
      }),
    };

    if (node.textScript === "superscript") {
      style.verticalAlign = "super";
    } else if (node.textScript === "subscript") {
      style.verticalAlign = "sub";
    }

    return <span style={style}>{node.text}</span>;
  }

  if (isSlateConfigNode(node)) {
    return (
      <>
        {node.children.map((child, index) => (
          <TextSpan key={index} node={child} />
        ))}
      </>
    );
  }

  return null;
};
