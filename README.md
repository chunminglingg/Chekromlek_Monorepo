 <!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://chekromlek.com/login/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chekromlek</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

We believe in the potential of every high schooler and university student to shape a brighter future.That why we generate the platform to let them communicate and sharing education on it. Everyone often struggle with certain problems,  and need additional help.So, we assist them by let them asking their problems in our platform and  get responding by another user to help refine the solution of problems. <a href="https://www.canva.com/design/DAGE7nikpbE/8jbzT2QnunxvAFMbHJGZeg/edit">Chekromlek</a>!


## Our vision
Empowering high school students to become independent researchers and innovative problem-solvers, ready to tackle real-world challenges.
<a href="https://www.canva.com/design/DAGF9d7yAQM/Y-iKLUCDiFGsyTVXK9RIPA/edit">Product vision board</a>

## Our mission
Creating a platform for high school students to collaborate, enhance research skills, and solve both academic and real-life problems together.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## UI design

* [![Static Badge](https://img.shields.io/badge/Figma-2C2D34?style=for-the-badge&logo=figma&logoColor=fff&color=%232C2D34)](https://www.figma.com/design/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?node-id=1-2&t=EcZKTIAlu3rlZG8J-0)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section highlights the major frameworks and libraries utilized to bootstrap our project. Please note that add-ons and plugins will be listed separately in the acknowledgements section. Here are some examples:

* [![Next][Next.js]][Next-url]
* [![Static Badge](https://img.shields.io/badge/Docker%20Desktop-1D63ED?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com/products/docker-desktop/)
* [![Static Badge](https://img.shields.io/badge/Node.js-499442?style=for-the-badge&logo=node.js&logoColor=fff&color=499442)](https://nodejs.org/en)
* [![Static Badge](https://img.shields.io/badge/Tyscript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff&color=3178C6)](https://www.typescriptlang.org/)
* [![Static Badge](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=fff&color=000)](https://expressjs.com/)
* [![Static Badge](https://img.shields.io/badge/Mongodb-%23023430?style=for-the-badge&logo=mongodb&logoColor=fff&color=%23023430)](https://www.mongodb.com/)


  

### Project Structure

<p>The project uses a microservices architecture within a single monorepo. Here's an overview of the directory structure and the purpose of each component:</p>

```
Chekromlek_Monorepo/
├── app
├── packages/
│   ├── api-gateway/
│   ├── auth/
│   ├── notification/
│   ├── post/
│   ├── users/
│   ├── volumes/
├── .gitignore
├── docker-compose.yaml
├── package-lock.json
├── package.json
├── README.md

```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To run the project, ensure you have Docker and Yarn installed on your system. Follow these steps:

1. Clone the Repository:

Open your terminal and run the following command to clone the project repository:

```sh
git clone https://github.com/chunminglingg/Chekromlek_Monorepo.git

```

2. Navigate to the Project Directory:

```sh
cd Chekromlek_Monorepo
```

3. Install Dependencies:

Navigate to the root directory of the project and run:

  ```sh
  yarn install
  ```

4. Start the Project using Docker:

Use the following command to start all services defined in the docker-compose.yaml file:

  ```sh
  yarn start:docker
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

chekromlek - chekromlek.info@gmail.com <br/>
Team members - chunming200@gmail.com - khievnavin@gmail.com - tiengkimlang10@gmail.com - hangsaphotan@gmail.com

Project Link: [https://github.com/chunminglingg/Chekromlek_Monorepo.git](https://github.com/chunminglingg/Chekromlek_Monorepo.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
