const Record = require('./Model/Record');
const express  =require('express')
const cors =require('cors')


const conectserver = require('./controlar/Db')
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(cors())

  io.on('connection', (socket) => {
    console.log('user joined')
    // Listen for "addRecord" event
    socket.on('addRecord', async ( title, description, images) => {
      try {
        console.log(title, description)
        const record = new Record({
          title,
          description,
          images,
        });
        await record.save();
        // Emit "recordAdded" event to all connected clients
        io.emit('recordAdded', {record});
      } catch (error) {
        console.error('Error adding record:', error);
      }
    });
    

    // Listen for "update record" event
    socket.on('updateRecord', async (formData) => {
      try {
        const { id, title, description, images } = formData;
        const record = await Record.findByIdAndUpdate(
          id,
          {
            title,
            description,
            images,
          },
          { new: true }
        );

        // Emit "recordUpdated" event to all connected clients
        io.emit('recordUpdated', record);
      } catch (error) {
        console.error('Error updating record:', error);
      }
    });

    // Listen for "delete record" event
    socket.on('deleteRecord', async (recordId) => {
      try {
        await Record.findByIdAndDelete(recordId);

        // Emit "recordDeleted" event to all connected clients
        io.emit('recordDeleted', recordId);
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

app.listen('6000',(req, res)=>{
    conectserver();
    console.log("server is live on 6000")
})