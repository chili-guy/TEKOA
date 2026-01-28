import blogDetailSvg from "../../SVGS/Blog & Notícias (1).svg?react";
import { SvgScreen } from "./SvgScreen";

type BlogNewsDetailProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const BlogNewsDetail = ({ onSelectTab }: BlogNewsDetailProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={blogDetailSvg}
      title="Blog & Notícias"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
