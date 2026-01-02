 const cardContainer = document.getElementById('cardContainer');
const statusMessage = document.getElementById('statusMessage');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let tumVeriler = [];

async function verileriGetir() {
    try {
        statusMessage.innerText = "Yükleniyor...";
        const yanit = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!yanit.ok) {
            throw new Error("Veri çekilirken hata oluştu");
        }
        
        tumVeriler = await yanit.json();
        kartlariBas(tumVeriler);
        statusMessage.innerText = ""; 
    } catch (hata) {
        statusMessage.innerText = "Hata: " + hata.message;
    }
}

function kartlariBas(liste) {
    cardContainer.innerHTML = "";
    
    if (liste.length === 0) {
        statusMessage.innerText = "Sonuç bulunamadı";
        return;
    }

    liste.forEach(kullanici => {
        const kart = document.createElement('div');
        kart.className = 'card';
        kart.innerHTML = `
            <h3>${kullanici.name}</h3>
            <p>Şehir: ${kullanici.address.city}</p>
            <button onclick="detayGoster(${kullanici.id})">Detay Gör</button>
        `;
        cardContainer.appendChild(kart);
    });
}

function detayGoster(id) {
    const kisi = tumVeriler.find(u => u.id === id);
    
    if (kisi) {
        document.getElementById('detailTitle').innerText = kisi.name;
        document.getElementById('detailEmail').innerText = "E-posta: " + kisi.email;
        document.getElementById('detailPhone').innerText = "Telefon: " + kisi.phone;
        document.getElementById('detailPanel').classList.remove('hidden');
    }
}

searchBtn.addEventListener('click', () => {
    const aramaTerimi = searchInput.value.toLowerCase();
    const filtreliListe = tumVeriler.filter(u => 
        u.name.toLowerCase().includes(aramaTerimi)
    );
    kartlariBas(filtreliListe);
});

document.getElementById('closeDetail').addEventListener('click', () => {
    document.getElementById('detailPanel').classList.add('hidden');
});

verileriGetir();