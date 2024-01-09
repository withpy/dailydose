import React from "react";

export default function About() {
  return (
    <div className="container px-5" style={{ marginTop: "4rem" }}>
      <h1 className="text-center mb-4">About DailyDose</h1>

      <div className="mb-5">
        <h2>Overview</h2>
        <p>
          DailyDose is a learning project created with passion and dedication to
          provide users with a seamless and informative news browsing
          experience. Developed using React and powered by the News API, this
          app is designed to deliver a curated selection of news articles from
          various categories, ensuring you stay informed about the latest
          happenings around the world. This project was made with{" "}
          <a
            href="https://www.youtube.com/@CodeWithHarry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code With Harry
          </a>
          's awesome React tutorial.
        </p>
      </div>
      <div className="mb-5">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Categories:</strong> Explore a diverse range of news
            categories tailored to your interests.
          </li>
          <li>
            <strong>Search Functionality:</strong> Looking for something
            specific? DailyDose allows you to search for news articles using
            keywords.
          </li>
          <li>
            <strong>User-Friendly Design:</strong> DailyDose features a clean
            and user-friendly design, making it accessible for users of all
            backgrounds.
          </li>
          <li>
            <strong>Learning Project:</strong> DailyDose is more than just a
            news app; it's a learning project. Developed as a part of a journey
            to enhance skills and understanding in React and API integration,
            the app reflects a commitment to continuous improvement and
            knowledge growth.
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <h2>How It Works</h2>
        <p>
          DailyDose fetches real-time news data from the News API, providing you
          with up-to-date information from reputable sources. The app's
          functionality is driven by React components, ensuring a dynamic and
          responsive user interface.
        </p>
      </div>
      <div className="mb-5">
        <h2>About Me</h2>
        <p>
          Aur kya haal chal
          <br /> Toh mera naam hai mohit kumar or abhi me react seekh raha iske
          alava mujhe python and django bhi aata hai. React seekhne ke peeche
          mera karan hai ki kuch naya banana (Facebook ya Youtube? Han ye jyada
          ho gya😅). Mujhe nahi pta ki me isse kya banane wala hoon lekin abhi
          mera plan hai ki ek aisi site banane ka jo azat roop se hame kisi
          dusre ke sath connect ker sake (omegle jaisi lekin behtar). Shayad
          bhavishya me kuch or behtar bhi bana saku toh dekhte hai. <br />
          Aap mujse se&nbsp;
          <a
            href="https://www.linkedin.com/in/mohit-kumar-67924b267/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          &nbsp;per connect ker sakte hai. Aur is project ka source code apko
          mere&nbsp;
          <a
            href="https://github.com/withpy/dailydose"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          &nbsp; per mil jaega.
        </p>
      </div>
    </div>
  );
}
