# KYC Mitra - GenAI RAG Helpdesk Platform

A production-ready GenAI RAG (Retrieval-Augmented Generation) helpdesk application that enables users to upload documents and ask intelligent questions. The system uses IBM Watson Discovery for document ingestion and retrieval, IBM watsonx.ai Granite for summarizing retrieved text chunks, and AWS Titan Text for generating final, grounded answers.

## 🚀 Features

- **Document Ingestion**: Drag-and-drop upload for PDF, DOCX, and TXT files
- **AI-Powered Chat**: Real-time chat interface with streaming responses
- **RAG Pipeline**: Advanced retrieval-augmented generation using multiple AI services
- **Admin Dashboard**: Comprehensive system management and monitoring
- **User Authentication**: Simple username/password authentication system
- **Document Management**: Browse, search, and manage uploaded documents
- **Source Citation**: Responses include links to source documents with confidence scores

## 🏗️ Architecture

### RAG Pipeline Flow
1. **Document Upload**: Files are chunked and indexed into IBM Watson Discovery
2. **Query Processing**: User questions are analyzed and sent to Discovery for retrieval
3. **Content Summarization**: IBM watsonx.ai Granite summarizes relevant chunks
4. **Answer Generation**: AWS Titan Text generates final answers with source citations

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: React Query, React Context
- **Authentication**: Custom implementation (ready for enterprise integration)
- **AI Services**: IBM Watson Discovery, IBM watsonx.ai, AWS Bedrock
- **Build Tool**: Vite

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- IBM Cloud account with Watson Discovery and watsonx.ai access
- AWS account with Bedrock access

### 1. Clone and Install
```bash
git clone <YOUR_GIT_URL>
cd kyc-mitra
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:

```env
# IBM Watson Discovery
VITE_WATSON_DISCOVERY_URL=https://api.us-south.discovery.watson.cloud.ibm.com
VITE_WATSON_DISCOVERY_API_KEY=your_discovery_api_key
VITE_WATSON_DISCOVERY_VERSION=2019-04-30
VITE_WATSON_DISCOVERY_ENVIRONMENT_ID=your_environment_id
VITE_WATSON_DISCOVERY_COLLECTION_ID=your_collection_id

# IBM watsonx.ai
VITE_WATSONX_URL=https://us-south.ml.cloud.ibm.com
VITE_WATSONX_API_KEY=your_watsonx_api_key
VITE_WATSONX_PROJECT_ID=your_project_id

# AWS Bedrock
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_AWS_REGION=us-east-1
VITE_AWS_BEDROCK_MODEL_ID=amazon.titan-text-express-v1
```

### 3. IBM Watson Discovery Setup
1. Create a Watson Discovery service instance in IBM Cloud
2. Create a new environment and collection
3. Note your environment ID and collection ID
4. Generate API credentials

### 4. IBM watsonx.ai Setup
1. Access IBM watsonx.ai platform
2. Create a new project
3. Note your project ID
4. Generate API credentials with Granite model access

### 5. AWS Bedrock Setup
1. Enable AWS Bedrock in your AWS account
2. Request access to Titan Text models
3. Create IAM user with Bedrock access
4. Generate access keys

### 6. Development Server
```bash
npm run dev
```

Visit `http://localhost:8080` to access the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── chat/          # Chat interface
│   ├── dashboard/     # Dashboard overview
│   ├── documents/     # Document management
│   ├── layout/        # Layout components
│   ├── upload/        # File upload functionality
│   ├── admin/         # Admin panel
│   └── ui/            # Reusable UI components
├── context/           # React contexts
├── hooks/             # Custom hooks
├── lib/              # Utility functions
└── pages/            # Page components
```

## 🔐 Authentication

### Demo Credentials
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### Production Integration
For production deployment, replace the mock authentication in `src/context/AuthContext.tsx` with your enterprise authentication system (SAML, OAuth, etc.).

## 🚢 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

```bash
docker build -t kyc-mitra .
docker run -p 8080:8080 kyc-mitra
```

### Production Environment Variables
Ensure all environment variables are properly configured in your production environment. Consider using:
- AWS Secrets Manager
- Azure Key Vault
- IBM Cloud Secrets Manager

## 🔧 Configuration

### Document Processing Settings
- **Max file size**: 10MB per file
- **Supported formats**: PDF, DOCX, TXT
- **Chunk size**: Configurable in Watson Discovery
- **Index refresh**: Automatic on upload

### AI Model Configuration
- **Discovery confidence threshold**: 0.7 (adjustable)
- **Granite summarization model**: `ibm/granite-13b-chat-v2`
- **Titan text model**: `amazon.titan-text-express-v1`

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📊 Monitoring

The admin panel provides:
- System status monitoring
- Service health checks
- Usage analytics
- Document indexing status
- Query performance metrics

## 🔒 Security Considerations

- All API keys should be stored securely using environment variables
- Implement rate limiting for production deployments
- Use HTTPS in production
- Regularly rotate API credentials
- Monitor for unusual usage patterns

## 🐛 Troubleshooting

### Common Issues

1. **Watson Discovery connection fails**
   - Verify API key and service URL
   - Check service instance status in IBM Cloud

2. **Document upload fails**
   - Ensure file size is under 10MB
   - Verify supported file format (PDF, DOCX, TXT)

3. **Chat responses are slow**
   - Check network connectivity to AI services
   - Monitor service latency in admin panel

4. **Authentication issues**
   - Verify demo credentials: admin/admin123 or user/user123
   - Check browser console for errors

## 📝 Development Notes

- **TODOs**: Search for `TODO` comments in the codebase for missing configurations
- **Mock Data**: The application uses mock data for demonstration; integrate real APIs for production
- **Error Handling**: Comprehensive error handling is implemented with user-friendly messages
- **Responsive Design**: Fully responsive design works on desktop and mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions:
- Create an issue in this repository
- Contact the development team
- Refer to IBM Watson and AWS Bedrock documentation

---

Built with ❤️ for intelligent document processing and AI-powered assistance.
