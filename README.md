# We Hear U

Welcome to **We Hear U** — a powerful feedback management platform that enables businesses to gather, analyze, and act on user feedback efficiently using AI-driven sentiment analysis.

## 🚀 Features
- **Feedback Ingestion**: Collect feedback from users through various channels.
- **Sentiment Analysis**: AI-powered analysis to understand user sentiments.
- **Real-time Notifications**: Receive alerts based on critical feedback.
- **Dashboard**: Visualize feedback data through intuitive dashboards.
- **API Management**: Secure and manage APIs with authentication and authorization.

---

## 🛠️ Architecture Diagram
Below is the system architecture illustrating how components interact within **We Hear U**.

![Architecture Diagram](ArchitectureDiagram.png)

### Components Overview:
1. **API Gateway**: Handles authentication, authorization, and routing.
2. **Authentication Service**: Manages user authentication and API keys.
3. **Feedback Service**: Ingests feedback data and stores it in the database.
4. **AI Service**: Performs sentiment analysis on collected feedback.
5. **Notification Service**: Sends real-time alerts to users based on feedback analysis.
6. **Frontend**: Provides a dashboard and notification center for users.
7. **Database**: Stores feedback data using PostgreSQL and MongoDB.
8. **Monitoring and Logging**: Integrated using Prometheus, Grafana, and Google Cloud Logging.

---

## 📐 Flow Diagram

Below is the flow diagram demonstrating how feedback is processed through the system.

<p align="center">
  <img src="FlowDiagram.png" alt="Flow Diagram" width="2800" height="1100">
</p>

### Flow Overview:
1. **User Feedback**: Users submit feedback through the frontend.
2. **API Gateway**: Routes feedback requests to the Feedback Service.
3. **Feedback Service**: Stores feedback in the database and sends it to the AI Service.
4. **AI Service**: Performs sentiment analysis and sends results back to the Feedback Service.
5. **Notification Service**: Sends real-time notifications if critical feedback is detected.
6. **Dashboard**: Visualizes feedback data and insights using the AI results.

---

## 🧑‍💻 Getting Started
Follow these steps to set up and run the project locally:

1. Clone the repository:
```bash
 git clone https://github.com/your-repo/we-hear-u.git
```

2. Install dependencies:
```bash
 cd we-hear-u
 npm install
```

3. Set up environment variables:
- Create a `.env` file and configure it as per `.env.example`.

4. Start the services:
```bash
 docker-compose up
```

5. Access the dashboard at:
```
 http://localhost:3000
```

---

## 📦 API Endpoints
| Method | Endpoint                | Description                 |
|---------|-------------------------|------------------------------|
| POST    | /api/feedback           | Submit user feedback         |
| GET     | /api/feedback           | Retrieve feedback data       |
| GET     | /api/sentiment-analysis | Perform sentiment analysis   |
| POST    | /api/notifications      | Trigger notifications        |

---

## 📊 Monitoring
- **Prometheus** and **Grafana** are integrated for real-time monitoring and observability.
- Logs are managed using **Google Cloud Logging**.

---

## 🤝 Contributing
We welcome contributions! Please submit a pull request or open an issue if you'd like to contribute.

---

## 📝 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy Coding! 🎉
