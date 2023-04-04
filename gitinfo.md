# Steps:
PreCondition : Make sure you're working in your review git branch with command "git checkout *YourFirstName*/review"
- Make Changes to repository
- Once finished, stage those changes with this command : git add .
- After that commit your changes to your branch with this command : git commit -m "*Explain your changes here*"
- Next, pull all the changes made on the main branch : git pull --rebase origin main
- Then, push your changes to your git review branch : git push origin *YourFirstName*/review
