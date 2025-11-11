'use client';

import { useState } from 'react';

const translations = {
    en: {
        title: "Founder Profile: Alok Anand Tripathi – Pioneering Sustainable Luxury and Fashion Innovation",
        content: "Alok Anand Tripathi is the visionary founder behind Golden Ghaf Clothing Company, a luxury fashion brand that masterfully intertwines sustainability with high-fashion aesthetics. With an unwavering commitment to ethical craftsmanship, innovative design, and environmental stewardship, Alok has established a brand that empowers women to express their individuality through fashion that is both timeless and transformative.",
        head1: "The Vision: Redefining Sustainable Luxury",
        content1: "Golden Ghaf Clothing Company stands as a beacon of sustainable luxury, offering women's apparel that harmoniously blends modern elegance with traditional craftsmanship. Alok's vision is to create a brand that caters to the discerning woman aged 15 to 45, seeking impeccable quality, exclusivity, and sustainability in her wardrobe. Each garment is meticulously crafted using eco-friendly, biodegradable materials, ensuring that luxury aligns with environmental responsibility.",
        content2: "Drawing inspiration from global fashion capitals, the brand's collections are designed to elevate the feminine aura by merging contemporary cuts with ethnic craftsmanship. This fusion results in garments that are not only stylish but also resonate with the empowered woman of today.",
        head2: "Ethical Craftsmanship: Empowering Women Through Design",
        content3: "At the core of Golden Ghaf Clothing Company lies a dedication to ethical craftsmanship that empowers women at every stage of production. Alok's belief that fashion should be both beautiful and empowering is reflected in the brand's commitment to handcraftsmanship by women, for women. This approach ensures that each piece carries the strength, creativity, and spirit of women worldwide.",
        content4: "The collections celebrate body positivity, gender fluidity, and individuality. Designs range from bold statement pieces to sophisticated power suits, luxe athleisure, and opulent eveningwear, offering something for every woman to embrace her unique style.",
        head3: "Wellness and Self-Care: Fashion That Nurtures",
        content5: "In 2025, wellness and self-care have become integral to the modern wardrobe, and Alok Anand Tripathi is at the forefront of this movement. Golden Ghaf Clothing Company integrates holistic well-being into every design, ensuring that garments are not only visually stunning but also comfortable and empowering to wear. By blending the finest textiles with sustainable, non-toxic dyes and eco-friendly treatments, the brand creates clothing that nurtures both body and soul.",
        content6: "The personalized shopping experience is a priority, with tailored services and exclusive collections that foster a deep sense of belonging. Golden Ghaf Clothing Company encourages women to indulge in fashion that supports their well-being, forging lasting connections with its community.",
        head4: "Sustainability at the Core: Fashion with Conscience",
        content7: "Sustainability is the foundation of every design and decision at Golden Ghaf Clothing Company. Alok's dedication to reimagining the fashion industry with a sustainable mindset is evident in the use of biodegradable fabrics, eco-conscious production techniques, and ethical sourcing of materials. The brand's commitment to reducing environmental impact aligns with the growing demand for luxury fashion that prioritizes sustainability.",
        head5: "Innovating Fashion: Merging Tradition with Modernity",
        content8: "Innovation is key to Golden Ghaf Clothing Company. Alok Anand Tripathi continually pushes the boundaries of design by integrating technological advancements while respecting traditional craftsmanship. The brand embraces the latest trends, such as elevated athleisure, bohemian influences, and vibrant color palettes, while incorporating modern elements like metallic finishes and futuristic silhouettes. This fusion of tradition and modernity results in collections that are both timeless and contemporary.",
        head6: "A Future of Empowerment and Connection",
        content9: "Looking ahead, Alok envisions Golden Ghaf Clothing Company as a global movement of empowerment, sustainability, and innovation. The brand aims to create a community where women from all walks of life come together to embrace their unique selves and express their values through fashion. With continued commitment to sustainable luxury, trendsetting innovation, and ethical craftsmanship, Golden Ghaf Clothing Company is poised to become a coveted name in luxury fashion, setting new standards for what it means to be truly luxurious, timeless, and responsible.",
        content10: "Golden Ghaf Clothing Company is not just about looking good—it's about feeling powerful, connected, and making a positive impact on the world. Through fashion, Alok Anand Tripathi is building a legacy of beauty, empowerment, and responsibility that will shape the industry for generations to come."
    },
    fr: {
        title: "Profil du Fondateur : Alok Anand Tripathi – Pionnier du Luxe Durable et de l'Innovation dans la Mode",
        content: "Alok Anand Tripathi est le fondateur visionnaire de la Golden Ghaf Clothing Company, une marque de mode de luxe qui mêle habilement durabilité et esthétique de haute couture. Avec un engagement sans faille pour l'artisanat éthique, le design innovant et la gestion de l'environnement, Alok a créé une marque qui permet aux femmes d'exprimer leur individualité à travers une mode à la fois intemporelle et transformative.",
        head1: "La Vision : Redéfinir le Luxe Durable",
        content1: "Golden Ghaf Clothing Company se dresse comme un phare du luxe durable, offrant des vêtements pour femmes qui allient harmonieusement élégance moderne et artisanat traditionnel. La vision d'Alok est de créer une marque qui s'adresse à la femme exigeante, âgée de 15 à 45 ans, à la recherche de qualité impeccable, d'exclusivité et de durabilité dans sa garde-robe. Chaque vêtement est méticuleusement conçu à partir de matériaux écologiques et biodégradables, garantissant que le luxe soit en harmonie avec la responsabilité environnementale.",
        content2: "S'inspirant des capitales de la mode mondiales, les collections de la marque sont créées pour élever l'aura féminine en fusionnant des coupes contemporaines avec un savoir-faire ethnique. Cette fusion donne naissance à des vêtements non seulement élégants, mais aussi en résonance avec la femme émancipée d'aujourd'hui.",
        head2: "L'Artisanat Éthique : Autonomiser les Femmes à Travers le Design",
        content3: "Au cœur de Golden Ghaf Clothing Company réside un engagement envers un artisanat éthique qui donne pouvoir aux femmes à chaque étape de la production. La conviction d'Alok selon laquelle la mode doit être à la fois belle et valorisante se reflète dans l'engagement de la marque pour un artisanat réalisé à la main par des femmes, pour des femmes. Cette approche garantit que chaque pièce porte la force, la créativité et l'esprit des femmes du monde entier.",
        content4: "Les collections célèbrent la positivité corporelle, la fluidité des genres et l'individualité. Les designs vont des pièces audacieuses aux costumes de puissance sophistiqués, en passant par l'athleisure de luxe et les tenues de soirée opulentes, offrant ainsi quelque chose pour chaque femme afin qu'elle embrasse son style unique.",
        head3: "Bien-être et Prendre Soin de Soi : Une Mode Qui Nourrit",
        content5: "En 2025, le bien-être et le soin de soi sont devenus des éléments essentiels de la garde-robe moderne, et Alok Anand Tripathi est à l'avant-garde de ce mouvement. Golden Ghaf Clothing Company intègre le bien-être holistique dans chaque design, garantissant que les vêtements soient non seulement visuellement époustouflants, mais aussi confortables et valorisants à porter. En alliant les meilleurs textiles à des teintures non toxiques et des traitements écologiques, la marque crée des vêtements qui nourrissent à la fois le corps et l'âme.",
        content6: "L'expérience d'achat personnalisée est une priorité, avec des services sur mesure et des collections exclusives qui favorisent un profond sentiment d'appartenance. Golden Ghaf Clothing Company encourage les femmes à s'adonner à une mode qui soutient leur bien-être, forgeant ainsi des liens durables avec sa communauté.",
        head4: "Durabilité au Cœur : La Mode avec Conscience",
        content7: "La durabilité est la base de chaque design et de chaque décision chez Golden Ghaf Clothing Company. L'engagement d'Alok à réinventer l'industrie de la mode avec une mentalité durable se reflète dans l'utilisation de tissus biodégradables, des techniques de production écoresponsables et une approche éthique dans l'approvisionnement des matériaux. L'engagement de la marque à réduire son impact environnemental s'aligne avec la demande croissante de mode de luxe qui privilégie la durabilité.",
        head5: "Innover dans la Mode : Fusionner Tradition et Modernité",
        content8: "L'innovation est la clé chez Golden Ghaf Clothing Company. Alok Anand Tripathi repousse sans cesse les limites du design en intégrant des avancées technologiques tout en respectant l'artisanat traditionnel. La marque adopte les dernières tendances, telles que l'athleisure de luxe, les influences bohémiennes et les palettes de couleurs vibrantes, tout en incorporant des éléments modernes comme des finitions métalliques et des silhouettes futuristes. Cette fusion de tradition et de modernité donne lieu à des collections à la fois intemporelles et contemporaines.",
        head6: "Un Avenir d'Autonomisation et de Connexion",
        content9: "En regardant vers l'avenir, Alok envisage Golden Ghaf Clothing Company comme un mouvement mondial d'autonomisation, de durabilité et d'innovation. La marque aspire à créer une communauté où les femmes de tous horizons se réunissent pour embrasser leur unicité et exprimer leurs valeurs à travers la mode. Avec un engagement continu pour le luxe durable, l'innovation de tendance et l'artisanat éthique, Golden Ghaf Clothing Company est prête à devenir un nom convoité dans le monde du luxe, en établissant de nouvelles normes sur ce que signifie être véritablement luxueux, intemporel et responsable.",
        content10: "Golden Ghaf Clothing Company ne se contente pas d'être une marque de mode—c'est un moyen de se sentir puissant, connecté et de laisser une empreinte positive sur le monde. À travers la mode, Alok Anand Tripathi construit un héritage de beauté, d'autonomisation et de responsabilité qui façonnera l'industrie pour les générations à venir."
    },
    it: {
        title: "Profilo del Fondatore: Alok Anand Tripathi – Pioniere del Lusso Sostenibile e dell'Innovazione nella Moda",
        content: "Alok Anand Tripathi è il fondatore visionario dietro Golden Ghaf Clothing Company, un marchio di moda di lusso che intreccia sapientemente la sostenibilità con l'estetica dell'alta moda. Con un impegno incrollabile per l'artigianato etico, il design innovativo e la cura dell'ambiente, Alok ha creato un marchio che consente alle donne di esprimere la propria individualità attraverso una moda che è sia senza tempo che trasformativa.",
        head1: "La Visione: Ridefinire il Lusso Sostenibile",
        content1: "Golden Ghaf Clothing Company si erge come un faro del lusso sostenibile, offrendo abbigliamento femminile che fonde armoniosamente eleganza moderna e artigianato tradizionale. La visione di Alok è quella di creare un marchio che soddisfi la donna esigente di età compresa tra i 15 e i 45 anni, alla ricerca di qualità impeccabile, esclusività e sostenibilità nel suo guardaroba. Ogni capo è realizzato con materiali eco-compatibili e biodegradabili, garantendo che il lusso sia in sintonia con la responsabilità ambientale.",
        content2: "Ispirandosi alle capitali mondiali della moda, le collezioni del marchio sono progettate per elevare l'aura femminile unendo tagli contemporanei e artigianato etnico. Questa fusione dà vita a capi che non sono solo eleganti, ma risuonano anche con la donna emancipata di oggi.",
        head2: "Artigianato Etico: Empowerment delle Donne Attraverso il Design",
        content3: "Nel cuore di Golden Ghaf Clothing Company c'è una dedizione all'artigianato etico che dà potere alle donne in ogni fase della produzione. La convinzione di Alok che la moda debba essere sia bella che valorizzante si riflette nell'impegno del marchio verso l'artigianato realizzato a mano da donne, per donne. Questo approccio assicura che ogni pezzo porti con sé la forza, la creatività e lo spirito delle donne di tutto il mondo.",
        content4: "Le collezioni celebrano la positività corporea, la fluidità di genere e l'individualità. I design spaziano da pezzi audaci e dichiarativi a completi potenti e sofisticati, athleisure di lusso e abiti da sera opulenti, offrendo qualcosa per ogni donna che voglia abbracciare il suo stile unico.",
        head3: "Benessere e Cura di Sé: Moda che Nutre",
        content5: "Nel 2025, il benessere e la cura di sé sono diventati elementi fondamentali del guardaroba moderno, e Alok Anand Tripathi è in prima linea in questo movimento. Golden Ghaf Clothing Company integra il benessere olistico in ogni design, assicurando che i capi non siano solo visivamente straordinari, ma anche comodi e valorizzanti da indossare. Fondendo i migliori tessuti con tinture sostenibili, non tossiche e trattamenti ecologici, il marchio crea abiti che nutrono sia il corpo che l'anima.",
        content6: "L'esperienza di shopping personalizzata è una priorità, con servizi su misura e collezioni esclusive che favoriscono un profondo senso di appartenenza. Golden Ghaf Clothing Company incoraggia le donne a indulgere in una moda che supporti il loro benessere, creando legami duraturi con la sua comunità.",
        head4: "Sostenibilità al Centro: Moda con Coscienza",
        content7: "La sostenibilità è la base di ogni design e decisione presso Golden Ghaf Clothing Company. L'impegno di Alok nel ridefinire l'industria della moda con una mentalità sostenibile è evidente nell'uso di tessuti biodegradabili, tecniche di produzione eco-consapevoli e approvvigionamento etico dei materiali. L'impegno del marchio per ridurre l'impatto ambientale si allinea con la crescente domanda di moda di lusso che pone la sostenibilità al primo posto.",
        head5: "Innovare la Moda: Fusione di Tradizione e Modernità",
        content8: "L'innovazione è la chiave per Golden Ghaf Clothing Company. Alok Anand Tripathi spinge costantemente i confini del design integrando progressi tecnologici pur rispettando l'artigianato tradizionale. Il marchio abbraccia le ultime tendenze, come l'athleisure elevato, le influenze bohemien e le palette di colori vivaci, incorporando anche elementi moderni come finiture metalliche e silhouette futuristiche. Questa fusione di tradizione e modernità dà vita a collezioni sia senza tempo che contemporanee.",
        head6: "Un Futuro di Empowerment e Connessione",
        content9: "Guardando al futuro, Alok immagina Golden Ghaf Clothing Company come un movimento globale di empowerment, sostenibilità e innovazione. Il marchio si propone di creare una comunità in cui le donne di ogni parte del mondo si riuniscano per abbracciare la propria unicità e esprimere i propri valori attraverso la moda. Con un impegno continuo per il lusso sostenibile, l'innovazione di tendenze e l'artigianato etico, Golden Ghaf Clothing Company è destinata a diventare un nome ambito nella moda di lusso, stabilendo nuovi standard su cosa significa essere veramente lussuoso, senza tempo e responsabile.",
        content10: "Golden Ghaf Clothing Company non riguarda solo l'aspetto esteriore—si tratta di sentirsi potenti, connessi e di fare un impatto positivo nel mondo. Attraverso la moda, Alok Anand Tripathi sta costruendo un'eredità di bellezza, empowerment e responsabilità che plasmerà l'industria per le generazioni a venire."
    }
};

export default function FounderPage() {
    const [language, setLanguage] = useState('en');

    return (
        <div className="max-w-4xl mx-auto p-6 pt-36">
            <div className="flex gap-4 my-6">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setLanguage('en')}>English</button>
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setLanguage('fr')}>Français</button>
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setLanguage('it')}>Italiano</button>
            </div>
            <h1 className="text-2xl font-bold mb-4">{translations[language].title}</h1>
            <p className="text-lg py-2">{translations[language].content}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head1}</p>
            <p className="text-lg py-2">{translations[language].content1}</p>
            <p className="text-lg py-2">{translations[language].content2}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head2}</p>
            <p className="text-lg py-2">{translations[language].content3}</p>
            <p className="text-lg py-2">{translations[language].content4}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head3}</p>
            <p className="text-lg py-2">{translations[language].content5}</p>
            <p className="text-lg py-2">{translations[language].content6}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head4}</p>
            <p className="text-lg py-2">{translations[language].content7}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head5}</p>
            <p className="text-lg py-2">{translations[language].content8}</p>
            <p className="text-xl font-semibold py-2">{translations[language].head6}</p>
            <p className="text-lg py-2">{translations[language].content9}</p>
            <p className="text-lg py-2">{translations[language].content10}</p>
        </div>
    );
}
