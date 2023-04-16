import React, { useEffect } from "react";
import { useState } from "react";
import CommentDropDown from "./comment_drop_down";
import HTTPRequester from "../utility/requester";
import PageTitle from "./page_title";
import ReactHtmlParser from "react-html-parser";

export default function StoryViewer(prop) {
  const [submissions, setSubmissions] = useState("Loading stories...");
  const { dataFeed, errorFeed, submitRequest: getData } = HTTPRequester();

  useEffect(() => {
    if (dataFeed === null) {
      getData(prop.author);
    } else {
      setSubmissions(dataFeed);
    }
  }, [dataFeed]);

  return (
    <>
      <PageTitle text="Viewing Stories" />
      <section>
        {submissions && submissions.results
          ? submissions.results.map((item) => (
              <>
                <section>
                  {" "}
                  <header className="articleHeader" id="p1">
                    <b>{item.title}</b> by {item.author} on {item.date}
                  </header>
                  <p class="article">
                    <div>{ReactHtmlParser(item.story)}</div>
                  </p>
                  <CommentDropDown storyID={item.uuid} />
                </section>
              </>
            ))
          : "No results"}
      </section>
    </>
  );
}
