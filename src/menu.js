function Menu() {
    const editor = JSON.parse(sessionStorage.getItem('Nutzer')).editor;

    //unterschiedliche Menüoptionen abhängig von Rolle des Nutzers
    return (
        <header>
            <nav>
                <a href="/">Startseite</a>
                <a href="/suche">Suche</a>
                <a href="/alleBeitraege">Abteilungen</a>
                {editor && <a href="/beitrag_neu">Neuer Beitrag</a>}
                {editor && <a href="/beitrag_neu">Neuer Leitfaden</a>}
                {editor && <a href="/">Einarbeitungsleitfaden</a>}
                <a href="/" onClick={() => logout()}>Abmelden</a>
            </nav>
            <section className="top-nav">
                <input id="menu-toggle" type="checkbox" />
                <label class='menu-button-container' for="menu-toggle">
                    <div class='menu-button'></div>
                </label>
                <ul className="menu">
                    <li><a href="/">Startseite</a></li>
                    <li><a href="/suche" className="activ">Suche</a></li>
                    <li><a href="/alleBeitraege">Abteilungen</a></li>
                    <li>{editor && <a href="/beitrag_neu">Neuer Beitrag</a>}</li>
                    <li>{editor && <a href="/beitrag_neu">Neuer Leitfaden</a>}</li>
                    <li>{editor && <a href="/">Einarbeitungsleitfaden</a>}</li>
                    <li><a href="/" onClick={() => logout()}>Abmelden</a></li>
                </ul>
            </section>
        </header>
    );
}


export default Menu;

function logout() {
    sessionStorage.removeItem('Nutzer');
}