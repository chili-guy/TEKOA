import blogSvg from "../../SVGS/Blog & Notícias.svg?react";
import { SvgScreen } from "./SvgScreen";

type BlogNewsScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const BlogNewsScreen = ({ onSelectTab }: BlogNewsScreenProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={blogSvg}
      title="Blog & Notícias"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
