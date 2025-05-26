#!/bin/bash

# Script to generate poster images from LUT videos
# Make sure FFmpeg is installed: brew install ffmpeg (on macOS)

echo "🎬 Generating poster images from LUT videos..."

# Create posters directory if it doesn't exist
mkdir -p public/luts/posters

# Array of video files
videos=("3Strip" "Punch" "Hannibal" "Glacier" "Duotone" "Drive")

# Generate poster for each video
for video in "${videos[@]}"; do
    input_file="public/luts/${video}.mp4"
    output_file="public/luts/${video}-poster.jpg"
    
    if [ -f "$input_file" ]; then
        echo "📸 Generating poster for ${video}.mp4..."
        
        # Extract frame at 2 seconds (usually a good representative frame)
        # -ss 2: seek to 2 seconds
        # -vframes 1: extract only 1 frame
        # -q:v 2: high quality (scale 1-31, lower is better)
        # Keep original aspect ratio (1080x1920 for vertical videos)
        ffmpeg -i "$input_file" -ss 2 -vframes 1 -q:v 2 "$output_file" -y
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully created ${video}-poster.jpg"
        else
            echo "❌ Failed to create poster for ${video}"
        fi
    else
        echo "⚠️  Video file not found: $input_file"
    fi
done

echo ""
echo "🎉 Poster generation complete!"
echo "📁 Posters saved in: public/luts/"
echo ""
echo "Generated files:"
ls -la public/luts/*-poster.jpg 2>/dev/null || echo "No poster files found" 