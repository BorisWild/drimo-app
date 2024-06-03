 if [ "$BUILDVAR" = "PRODUCTION" ]; then
    npx serve -s build -l 3000
else
    npm start
fi