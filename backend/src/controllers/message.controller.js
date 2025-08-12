import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("=== SENDING MESSAGE DEBUG ===");
    console.log("Raw req.params:", req.params);
    console.log("Raw req.params.id:", req.params.id);
    console.log("Extracted receiverId:", receiverId);
    console.log("Extracted receiverId type:", typeof receiverId);
    console.log("Sender from req.user._id:", senderId);
    console.log("Sender from req.user._id type:", typeof senderId);
    console.log("req.user:", { _id: req.user._id, fullName: req.user.fullName });
    console.log("Are they the same?", receiverId === senderId);
    console.log("Are they the same (string)?", receiverId === senderId.toString());
    console.log("Message text:", text);

    // Convert to strings to ensure consistency
    const senderIdString = senderId.toString();
    const receiverIdString = receiverId.toString();

    console.log("String comparison - same?", senderIdString === receiverIdString);

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: senderIdString,
      receiverId: receiverIdString,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    console.log("Message saved to DB:", {
      _id: newMessage._id,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      text: newMessage.text
    });

    const receiverSocketId = getReceiverSocketId(receiverIdString);
    console.log("Receiver Socket ID:", receiverSocketId);
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message emitted to socket:", receiverSocketId);
    } else {
      console.log("Receiver is not online or socket not found");
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
