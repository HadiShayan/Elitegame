const sheetUrl = 'YOUR_SHEET_CSV_LINK'; // لینک CSV منتشر شده از گوگل شیت

fetch(sheetUrl)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const tbody = document.querySelector('#leaderboard tbody');

    rows.forEach((row, index) => {
      if (!row.trim()) return;
      const cols = row.split(',');
      const tr = document.createElement('tr');
      
      // Rank
      const rankTd = document.createElement('td');
      rankTd.textContent = index + 1;
      if (index === 0) rankTd.classList.add('top1');
      else if (index === 1) rankTd.classList.add('top2');
      else if (index === 2) rankTd.classList.add('top3');
      tr.appendChild(rankTd);

      // Avatar
      const avatarTd = document.createElement('td');
      const img = document.createElement('img');
      img.src = cols[1] || 'assets/default-avatar.png';
      img.style.width = '40px';
      img.style.borderRadius = '50%';
      avatarTd.appendChild(img);
      tr.appendChild(avatarTd);

      // Name
      const nameTd = document.createElement('td');
      nameTd.textContent = cols[0];
      tr.appendChild(nameTd);

      // Level
      const levelTd = document.createElement('td');
      levelTd.textContent = cols[2];
      tr.appendChild(levelTd);

      // XP
      const xpTd = document.createElement('td');
      const progress = document.createElement('progress');
      progress.max = cols[4];
      progress.value = cols[3];
      xpTd.appendChild(progress);
      tr.appendChild(xpTd);

      // Wins
      const winsTd = document.createElement('td');
      winsTd.textContent = cols[5];
      tr.appendChild(winsTd);

      tbody.appendChild(tr);
    });
  });