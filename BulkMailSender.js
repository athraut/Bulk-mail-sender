import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import './BulkMailSender.css'; // Import the CSS file

const BulkMailSender = () => {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleString('en-GB', options).replace(',', ''); // Format as dd-MMM-yyyy HH:mm:ss
  };

  const sendEmails = () => {
    const emailList = emails.split(",").map(email => email.trim()); // Split and trim emails
    const timestamp = formatDate(new Date()); // Custom formatted timestamp

    emailList.forEach((email) => {
      const templateParams = {
        to_email: email,
        subject,
        message,
        timestamp,
      };

      // Ensure these values are replaced with actual IDs from EmailJS
      emailjs
        .send(
          "service_alsyyns",   // Replace with your EmailJS Service ID
          "template_tkvq69c",  // Replace with your EmailJS Template ID
          templateParams,      // Template parameters
          "BPdm25OvQsFBt9-Kd"  // Replace with your EmailJS Public Key (User ID)
        )
        .then(
          (response) => setStatus("Emails sent successfully!"),
          (error) => setStatus(`Error: ${error.text}`)
        );
    });
  };

  return (
    <motion.div
      className="bulk-mail-container" // Apply the container class
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bulk Mail Sender</h1>
      <motion.textarea
        className="email-input"
        placeholder="Enter emails separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      <motion.input
        className="subject-input"
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.textarea
        className="message-input"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />
      <motion.button
        onClick={sendEmails}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        Send Emails
      </motion.button>
      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
};

export default BulkMailSender;
