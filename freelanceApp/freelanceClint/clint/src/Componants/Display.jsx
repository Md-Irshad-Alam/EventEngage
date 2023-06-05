// src/App.js

import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { Container, Header, Form, Input, Button, List, Icon } from 'semantic-ui-react';

const socket = socketIOClient('http://localhost:6060');

const Display = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', description: '' });

  useEffect(() => {
    socket.on('recordAdded', (record) => {
      setRecords((prevRecords) => [...prevRecords, record]);
    });

    socket.on('recordUpdated', (updatedRecord) => {
      setRecords((prevRecords) => {
        const updatedRecords = prevRecords.map((record) => {
          if (record._id === updatedRecord._id) {
            return updatedRecord;
          }
          return record;
        });
        return updatedRecords;
      });
    });

    socket.on('recordDeleted', (deletedRecord) => {
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== deletedRecord._id));
    });

    return () => {
      socket.off('recordAdded');
      socket.off('recordUpdated');
      socket.off('recordDeleted');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });
      const data = await response.json();
      setNewRecord({ name: '', description: '' });
      console.log('Record added:', data);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/records/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Record deleted:', data);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/records');
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error retrieving records:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <Container>
      <Header as="h1">Records</Header>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <Input
            placeholder="Enter name"
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Input
            placeholder="Enter description"
            value={newRecord.description}
            onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
          />
        </Form.Field>
        <Button type="submit">Add Record</Button>
      </Form>

      <List divided relaxed>
        {records.map((record) => (
          <List.Item key={record._id}>
            <List.Content>
              <List.Header>{record.name}</List.Header>
              <List.Description>{record.description}</List.Description>
            </List.Content>
            <List.Content floated="right">
              <Icon name="trash" onClick={() => handleDelete(record._id)} />
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Display;

