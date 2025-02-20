import React, { useState, useEffect } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import axios from 'axios';

import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import NewsCard from '../components/NewsCard';


const Home = () => {
  const [news, setNews] = useState([]); // State to store the fetched news
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch news using Axios when the component mounts
  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=586439f6eb7241b7a7edf2e1c6556332') // Replace with your actual news API endpoint
      .then(response => {
        setNews(response.data.articles); // Store the fetched news data
        console.log(response.data.articles);
        
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch(error => {
        console.error("There was an error fetching the news:", error);
        setLoading(false); // Handle error and stop loading
      });
  }, []);

  return (
    <div>
      {/* Carousel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}  // Use the imported image
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Heat Destroys All Order. Except for in This One Special Case.</h3>
            <p>Heat is supposed to ruin anything it touches. But physicists have shown that an idealized form of magnetism is heatproof</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}  // Use the imported image
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>What's inside a Black Hole?</h3>
            <p>Shocking details about Black Hole by scientists.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}  // Use the imported image
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Do We Need a New Theory of Gravity?</h3>
            <p>Our current understanding of gravity needs to continue to evolve.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* News Cards */}
      <div className="container my-5">
        <div className="row">
          {loading ? (
            <div>Loading news...</div> // Show loading text while fetching
          ) : (
            news.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsCard
                  news={{
                    image: article.urlToImage, // Assuming your API returns image URL
                    title: article.title, // Assuming your API returns title
                    content: article.content, // Assuming your API returns content
                    publishedAt: article.publishedAt // Assuming your API returns publishedAt
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
