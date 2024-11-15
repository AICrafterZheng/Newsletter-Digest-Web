export function formatSummary(text: string): string {
  if (!text) {
    return "";
  }

  // Function to clean text
  const cleanText = (text: string) => {
    return text
      .trim()
      .replace(/^["'()]|["'()]$/g, '')
      .replace(/^•\s*/, '')           // Remove •
      .replace(/^-\s*/, '')           // Remove dashes
      .replace(/^\d+\.\s*/, '')       // Remove numbers and dots
      .trim();
  };

  // Split the text into lines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim());

  let html = '<ul class="digest-list">';
  let inSubList = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (/^\d+\./.test(trimmedLine)) {
      // Close previous sublist if exists
      if (inSubList) {
        html += '</ul></li>';
        inSubList = false;
      }
      // Start new numbered item
      html += `<li ">${cleanText(trimmedLine)}`;
    } else if (trimmedLine.startsWith('-')) {
      // Handle sub-points
      if (!inSubList) {
        html += '<ul class="nested-list">';
        inSubList = true;
      }
      html += `<li>${cleanText(trimmedLine)}</li>`;
    } else {
      // Close previous sublist if exists
      if (inSubList) {
        html += '</ul></li>';
        inSubList = false;
      }
      // Regular line
      html += `<li>${cleanText(trimmedLine)}</li>`;
    }
  }

  // Close any open sublists
  if (inSubList) {
    html += '</ul></li>';
  }

  html += '</ul>';
  return html;
} 

