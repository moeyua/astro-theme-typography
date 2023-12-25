#!/bin/bash

# Get the current date and time
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Prompt the user to enter the title of the article
read -p "Please enter the title of the article: " title

# Generate the filename based on the title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Concatenate the file path
filepath="./src/content/posts/$filename.md"

# Check if the file already exists
if [ -f "$filepath" ]; then
  echo "Error: File already exists!"
  exit 1
fi

# Create a new article file
touch "$filepath"

# Write the header information of the article
echo "---" >> "$filepath"
echo "title: $title" >> "$filepath"
echo "pubDate: $timestamp" >> "$filepath"
echo "categories: []" >> "$filepath"
echo "description: ''" >> "$filepath"
echo "---" >> "$filepath"
echo "" >> "$filepath"

echo "Successfully created a new article: $filepath"
