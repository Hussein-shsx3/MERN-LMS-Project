import React from "react";

const Home = () => {
  const videoUrl = "https://youtu.be/Tn6-PIqc4UM?si=4yLw1JkQnUEpfRHf";
  const title = "Introduction to React";
  const getEmbeddableUrl = (videoUrl) => {
    const videoId =
      videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  const embeddableUrl = getEmbeddableUrl(videoUrl);

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <iframe
          width="560"
          height="315"
          src={embeddableUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Home;
