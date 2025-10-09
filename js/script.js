// Simple event listener example for MVP
document.addEventListener("DOMContentLoaded", () => {
  console.log("Campus Life Super App loaded!");
});
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("mapSearch").value;
  if(query.trim() !== "") {
    alert(`Searching for "${query}"... (placeholder for actual map search)`);
  } else {
    alert("Please enter a location to search.");
  }
});
