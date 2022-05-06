Part 2: Changes to your application

1. You have a new requirement to implement for your application: its logic should stay exactly the same but it will need to have a different user interface (e.g. if you wrote a web app, a different UI may be a REPL). Please describe how you would go about implementing this new UI in your application? Would you need to restructure your solution in any way?

Answer: The current UI is coded with HTML and CSS. It utilizes Javascript to call class names and IDs to take in user input and to dynamically change the web page based on these values. If a new UI was needed it would be necessary to ensure that the classes and IDs were able to be linked to the elements of the new UI so that the Javascript functions would still behave as intended. If the job of completely changing the UI was more time-consuming than beneficial, it may be better to redesign the HTML and CSS files to better suit the end-user while keeping the integrity of the app.
******

2. You now need to make your application “production ready”, and deploy it so that it can be used by customers. Please describe the steps you’d need to take for this to happen.

Answer: The app would need to go through testing and UA-Testing before full deployment. It is currently hosted for free on GitHub pages. Purchasing a domain name and connecting it to the GitHub page is relatively easy and cheap. After the testing, we would push it from a Staging site to a Production Site. Further changes would be done on the Staging site first and only after testing and approval would it be pushed to Production.
******
3. What did you think about this coding test - is there anything you’d suggest in order to improve it?

Answer: Instruction ‘1.’ was slightly confusing, but after reading and re-reading the document it made sense.
