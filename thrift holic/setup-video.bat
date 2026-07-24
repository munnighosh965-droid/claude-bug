@echo off
echo ========================================
echo THRIFT HOLIC - Video Setup Helper
echo ========================================
echo.

set "SOURCE=C:\Users\munni\Downloads\WhatsApp Video 2026-07-24 at 5.57.27 PM.mp4"
set "DEST=C:\Users\munni\OneDrive\Documents\thrift holic\WhatsApp Video 2026-07-24 at 5.57.27 PM.mp4"

echo Checking if video file exists in Downloads...
if exist "%SOURCE%" (
    echo [OK] Video file found!
    echo.
    echo Copying video to project folder...
    copy "%SOURCE%" "%DEST%"
    if %ERRORLEVEL% EQU 0 (
        echo [SUCCESS] Video copied successfully!
        echo.
        echo Your video is now ready to use.
        echo Open index.html in your browser to see it!
    ) else (
        echo [ERROR] Failed to copy video.
        echo Please copy it manually.
    )
) else (
    echo [WARNING] Video file not found in Downloads folder.
    echo.
    echo Please manually copy your video file to:
    echo %DEST%
    echo.
    echo Or update the video filename in index.html (line 95)
)

echo.
echo ========================================
echo Press any key to open the website...
echo ========================================
pause > nul

start "" "index.html"
