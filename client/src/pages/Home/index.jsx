export default function Home() {
  return (
    <>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <video
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <track kind="captions" />
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
