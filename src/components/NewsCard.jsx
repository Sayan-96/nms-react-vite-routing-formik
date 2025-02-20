import { Card } from 'react-bootstrap';

const NewsCard = ({ news }) => {

  console.log(news);

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={news.image} onError={(e) => {e.target.src="images/image4.jpg"}}/>
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Text>{news.content}</Card.Text>
        <Card.Text>{String(news.publishedAt).slice(0, 10)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
