# SVG Image Clicker

## Overview

SVG Image Clicker is an interactive web game where users are tasked with clicking on the correct SVG objects among a grid of images. The objective is to find and click on the correct object, which is randomized each time the game starts. Upon successfully selecting all the correct objects, the game will show a "Finish" button and display a congratulatory message.

This project is built using HTML, CSS, and JavaScript, and incorporates SVG images for a more visually engaging experience.

## Features

- Randomized correct object for each round
- Interactive SVG images with hover and click effects
- Feedback on correct or incorrect selections
- Responsive design for different screen sizes (including mobile devices)
- "Finish" button that appears when the game is completed
- Reset functionality after a mistake or game completion

## Demo

You can try the game live by visiting the [live demo link](#).

## Installation

To set up this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/svg-image-clicker.git
   ```

2. Navigate to the project folder:
   ```bash
   cd svg-image-clicker
   ```

3. Open the `index.html` file in your preferred browser:
   ```bash
   open index.html  # on macOS
   # or just double-click index.html on other operating systems
   ```

4. Start playing the game!

## How It Works

1. **Randomizing the Correct Object**  
   The game starts by randomizing which SVG object (e.g., bird, house, tree, or car) is the "correct" one for the round. This object will be displayed in the instructions.

2. **Grid of SVG Images**  
   A grid of 4 SVG images is generated using random objects. These images are clickable, and when clicked, they check if they match the correct object.

3. **Feedback**  
   If a user selects the correct object, a "correct" message is shown, and the user progresses. If the user clicks an incorrect object, the game informs them that they were wrong and resets the game state.

4. **Finish Button**  
   Once all objects are selected correctly, a "Finish" button appears, allowing the user to finish the game and reset it for a new round.

## Game Flow

- The game will prompt the user with a message to click on a specific object.
- The user interacts with a grid of randomly displayed SVG objects.
- When the user clicks the correct object, the game provides feedback and allows them to select the next object.
- If the user clicks an incorrect object, the game resets, and they are prompted again.
- Once all objects are selected correctly, the "Finish" button is shown, and a congratulatory message appears.

## File Structure

```
/svg-image-clicker
  ├── index.html         # Main HTML file
  ├── style.css          # CSS for styling the game
  ├── script.js          # JavaScript for game logic
  ├── /img               # Folder for storing SVG image files (bird.svg, house.svg, etc.)
      ├── bird.svg
      ├── house.svg
      ├── tree.svg
      └── car.svg
```

## Technologies Used

- **HTML**: Structure and content of the game
- **CSS**: Styling and responsive layout
- **JavaScript**: Game logic and interactivity
- **SVG**: Scalable vector graphics for interactive images

## Dependencies

This project has no external dependencies and works using only native HTML, CSS, and JavaScript.

## Responsive Design

The layout adjusts based on the screen size:
- On small screens (up to 480px), the grid switches to a single-column format for easy interaction.
- For medium-sized screens (up to 768px), the grid shows two columns.
- On larger screens, a 4-column grid is used for optimal space utilization.

## Contributing

If you'd like to contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The SVG images used in this game are placeholders and can be replaced with any other images you prefer. You can find free SVG images on websites like [Heroicons](https://heroicons.com/) or [unDraw](https://undraw.co/).

---

Feel free to reach out if you have any questions or suggestions for improvements!