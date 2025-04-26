// Using server API instead of direct client-side calls
export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
};

export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    // Format messages for the API
    const formattedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Get session token
    const sessionId = localStorage.getItem('cleverai_session');
    if (!sessionId) {
      throw new Error('Authentication required');
    }

    // Make API call to our backend endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`
      },
      body: JSON.stringify({ messages: formattedMessages })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get chat completion');
    }

    const data = await response.json();
    return data.data || 'No response received from the AI.';
  } catch (error: any) {
    console.error("Error getting chat completion:", error);
    throw new Error(error.message || "Failed to get a response from the AI");
  }
}

export async function analyzeImage(base64Image: string, prompt: string = "What's in this image?"): Promise<string> {
  try {
    // TODO: Implement image analysis API endpoint on the server
    // For now, return a message that this feature is coming soon
    return "Image analysis feature is coming soon! Check back later.";
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    throw new Error(error.message || "Failed to analyze the image");
  }
}