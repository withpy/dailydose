import React from "react";
import { Helmet } from "react-helmet";
import preview from "../media/dailydose_preview.png"
export default function Seo() {
  return (
    <Helmet>
      <meta property="og:title" content="DailyDose: Your Ultimate Real-Time News Hub with Dynamic Categories and Powerful Search Features" />
      <meta property="og:image" content={preview} />
      <meta
        property="og:description"
        content="Stay informed with DailyDose, your daily source for breaking news, trending stories, and in-depth analysis. Visit our news app for the latest updates on politics, technology, entertainment, and more."
      />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
}
