import { db } from "./db";

function Menu() {
    const editor = JSON.parse(sessionStorage.getItem('Nutzer')).editor;

    //unterschiedliche Menüoptionen abhängig von Rolle des Nutzers
    return (
        <header>
            <nav>
                <a href="/">Startseite</a>
                <a href="/suche">Suche</a>
                <a href="/alleBeitraege">Alle Beiträge</a>
                {editor && <a href="/beitrag_neu">Neuer Beitrag</a>}
                {editor && <a href="/leitfaden_neu">Neuer Leitfaden</a>}
                {editor && <a href="/leitfaden">Einarbeitungsleitfaden</a>}
                <a href="/" onClick={() => logout()}>Abmelden</a>
            </nav>
            <section className="top-nav">
                <input id="menu-toggle" type="checkbox" />
                <label className='menu-button-container' for="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    <li><a href="/">Startseite</a></li>
                    <li><a href="/suche" className="activ">Suche</a></li>
                    <li><a href="/alleBeitraege">Alle Beiträge</a></li>
                    <li>{editor && <a href="/beitrag_neu">Neuer Beitrag</a>}</li>
                    <li>{editor && <a href="/leitfaden_neu">Neuer Leitfaden</a>}</li>
                    <li>{editor && <a href="/leitfaden">Einarbeitungsleitfaden</a>}</li>
                    <li><a href="/" onClick={() => logout()}>Abmelden</a></li>
                </ul>
            </section>
        </header>
    );
}


export default Menu;

function logout() {
    const nutzer = JSON.parse(sessionStorage.getItem('Nutzer'));
    updateNutzer(nutzer.id, nutzer)

    async function updateNutzer(nutzerId, nutzer) {
        try {
            const result = await db.benutzer.update(nutzerId, nutzer);
            console.log(result);
        } catch (error) {

        }
    }
    sessionStorage.removeItem('Nutzer');
}