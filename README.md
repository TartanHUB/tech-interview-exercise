# Coding Exercise

Welcome to the coding exercise, and thank you for your interest in joining 
the TartanHUB team! The purpose of this coding exercise is to allow us to 
have a better understanding of your individual approach to development.

We respect that your time is valuable, so we ask that you limit the time
you spend on this exercise to _roughly 2 hours_ from start to finish.

If you find yourself with questions or concerns as you work through this 
exercise, please reach out to us.

## Guidelines

1. Create a fork of this repository to your GitHub account and create a new 
   branch to work under. When you've finished working, [open a pull request 
   against this repo and request a review][PR] to let us know you're done. 
2. You'll be creating a **TypeScript React single-page application**.
3. The app will consist of two pages: the **Log In** page, and the 
   **Gallery** page.
4. We have provided mockups of the two pages under the `./mockups` directory.
   Please follow the layout of these mockups, but stylistic choices are yours.

[PR]: https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork


### Log In Page

The log in form consists of a username field, a password field, and a submit 
button. If the username and password are not valid, an error message should 
be shown, otherwise the user should be taken to the gallery page.

The submitted `username` and `password` should be validated against the set 
of users found at this endpoint:

```
https://jsonplaceholder.typicode.com/users
```

_Note that the above endpoint does not have a `password` field; instead, 
treat the `email` field as a password. For example, for the username of 
`Bret`, the password would be `Sincere@april.biz`._ 

A user session can either be kept in memory, or persisted in `sessionStorage`.

### Gallery Page

The gallery page should not be accessible unless the user has logged in 
successfully. The source of the image gallery images is this endpoint:

```
https://jsonplaceholder.typicode.com/albums/1/photos
```

The gallery should show the first 10 images, and should note the total 
number of images.

Clicking on an image should open a modal with the 
full-sized image, the `title` written below the image, and a close button in 
the top right corner.
