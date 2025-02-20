import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const AddNewsForm = () => {
  const [newsData, setNewsData] = useState({
    category: '',
    title: '',
    content: '',
    source: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save to database or state (can simulate with localStorage or API)
    const res = await axios.post('http://localhost:4000/news', newsData);
    localStorage.setItem('newsData', JSON.stringify(newsData));
    alert('News Added!');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={newsData.category}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={newsData.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={newsData.content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="source">
        <Form.Label>Source</Form.Label>
        <Form.Control
          type="text"
          name="source"
          value={newsData.source}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={newsData.image}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add News
      </Button>
    </Form>
  );
};

export default AddNewsForm;
