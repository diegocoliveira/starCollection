const mainContent = document.getElementById('root');

const homePage = `
<section id="mainRight">
<h1 id="title">STAR COLLECTION</h1>
<button id="btnChange">QUERO TROCAR</button>
</section>
`;

mainContent.innerHTML = homePage;

export default () => {
    return homePage;
};
