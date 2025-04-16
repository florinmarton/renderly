export async function fetchDesignJson(hash: string) {
  try {
    const url = `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/${hash}/json`;
    console.log(`Fetching design JSON from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch design: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching design JSON:', error);
    throw error;
  }
}