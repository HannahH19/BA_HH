function Menu() {
    return (
        <header>
        <nav>
            <a href="/">Startseite</a>
            <a href="suche_design_mockup.html">Suche</a>
            <a href="abteilung.html">Abteilungen</a>
            <a href="/" onClick={() => logout()}>Abmelden</a>
            <a href="/beitrag_neu">Neuer Beitrag</a>
        </nav>
        <section className="top-nav">
            <input id="menu-toggle" type="checkbox" />
            <label class='menu-button-container' for="menu-toggle">
                <div class='menu-button'></div>
            </label>
            <ul className="menu">
                <li><a href="/">Startseite</a></li>
                <li> <a href="suche_design_mockup.html" className="activ">Suche</a></li>
                <li> <a href="abteilung.html">Abteilungen</a></li>
                <li> <a href="login.html">Abmelden</a></li>
            </ul>
        </section>
    </header>
    );
  }

export default Menu;

function logout(){
    sessionStorage.removeItem('Nutzer');
}