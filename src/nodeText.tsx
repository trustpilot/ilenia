import * as React from 'react';
import { interpolate, Interpolations, Tag, useTranslations } from '.';

export interface Node {
  start?: string;
  end?: string;
  key?: string;
  render: (match: React.ReactNode, key: string) => React.ReactNode;
}

export interface NodeTextProps {
  id: string;
  interpolations?: Interpolations;
  tag?: Tag;
  nodes: Node[];
};

const escapeRegex = (str: string) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const nodeRegex = (startTag: string, endTag: string) =>
  new RegExp(`${escapeRegex(startTag)}(.*)${escapeRegex(endTag)}`, 'g');

const addDefaultValues = (node: Node) => ({
  ...node,
  start: node.start || '[NODE-BEGIN]',
  end: node.end || '[NODE-END]',
});

export const NodeText = ({ id, nodes, interpolations, tag = { start: '[', end: ']' } }: NodeTextProps) => {
  const [translations] = useTranslations();
  let inputString = translations[id];
  if (!inputString) {
    console.error(`Couldn't find '${id}' in the translations table`); // eslint-disable-line no-console
    return null;
  }
  const nodeInterpolations: { [keyof: string]: React.ReactNode } = {};

  nodes.map(addDefaultValues).forEach(({ start, end, render, key: customKey }, index) => {
    const regexp = nodeRegex(start, end);
    const key = `text-interpolation-${index}`;
    const matches = regexp.exec(inputString);
    if (matches === null) return;
    const [withTags, nodeChildren] = matches;

    nodeInterpolations[key] = render(
      interpolations ? interpolate(nodeChildren, interpolations) : nodeChildren,
      customKey ?? key
    );
    inputString = inputString.replace(withTags, `${tag.start}${key}${tag.end}`);
  });

  return <React.Fragment>{interpolate(inputString, { ...nodeInterpolations, ...interpolations }, tag)}</React.Fragment>;
};

// Example Use, uncomment to check //
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const Test: React.FC = () => {
//   return (
//     <NodeText
//       id="whatever"
//       nodes={[
//         {
//           start: '[LINK-BEGIN]',
//           end: '[LINK-END]',
//           render: translation => `my own ${translation}`,
//         },
//       ]}
//     />
//   );
// };
