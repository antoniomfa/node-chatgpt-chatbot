import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    // Testing sample question
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ "role": "user", "content": "Do I like chocolate?" }],
    // });

    // console.log(chatCompletion.choices[0].message);
    // -------------------------------------

    // Testing console typing
    // const userName = readlineSync.question('May I have your name?');
    // console.log(`Hello ${userName}`);
    // -------------------------------------

    // Testing colors
    console.log(colors.bold.green('::::::::::::::::CHAT GPT CHATBOT::::::::::::::::'));
    console.log(colors.bold.yellow(`Start chat (type 'exit' to stop).`));
    // -------------------------------------

    // Chat logic
    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.blue('User: '));

        try {
            // Construct messages by iterating over history
            const messages = chatHistory.map(([role, content]) => ({ role, content }));

            // Add latest user input
            messages.push({ role: "user", content: userInput });

            // Call API with user input
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages
                // messages: [{ "role": "user", "content": userInput }]
            })

            // Get response text/content
            const completionText = completion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                return;
            }

            console.log(colors.cyan('CHATGPT: ' + completionText));

            // Update history
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", completionText]);
        }
        catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();