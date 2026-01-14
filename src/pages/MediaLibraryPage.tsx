import { Sidebar } from "../components";
import MediaLibrary from "../components/MediaLibrary";

const MediaLibraryPage = () => {
  return (
    <div className="flex h-auto border-t border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="w-full dark:bg-blackPrimary bg-whiteSecondary ">
        <MediaLibrary />
      </div>
    </div>
  );
};

export default MediaLibraryPage;
