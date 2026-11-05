cat > scripts/fix-chat.js << 'EOF'
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'data', 'passwords.db');
console.log('📁 Base de datos:', DB_PATH);

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.get("PRAGMA table_info(chat_messages)", (err, rows) => {
    if (err) {
      console.error('❌ Error al verificar tabla:', err);
      db.close();
      return;
    }
    
    if (!rows || rows.length === 0) {
      console.log('⚠️ La tabla chat_messages no existe, creándola...');
      db.run(`
        CREATE TABLE IF NOT EXISTS chat_messages (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          username TEXT NOT NULL,
          displayName TEXT NOT NULL,
          message TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          type TEXT DEFAULT 'text',
          private INTEGER DEFAULT 0,
          recipientId TEXT
        )
      `);
      console.log('✅ Tabla chat_messages creada');
      db.close();
      return;
    }
    
    const columns = rows.map(r => r.name);
    console.log('📋 Columnas actuales:', columns.join(', '));
    
    let hasChanges = false;
    
    if (!columns.includes('private')) {
      console.log('📦 Agregando columna private...');
      db.run('ALTER TABLE chat_messages ADD COLUMN private INTEGER DEFAULT 0');
      hasChanges = true;
    }
    
    if (!columns.includes('recipientId')) {
      console.log('📦 Agregando columna recipientId...');
      db.run('ALTER TABLE chat_messages ADD COLUMN recipientId TEXT');
      hasChanges = true;
    }
    
    if (!hasChanges) {
      console.log('✅ Todas las columnas ya existen');
      db.close();
      return;
    }
    
    setTimeout(() => {
      db.get("PRAGMA table_info(chat_messages)", (err, rows) => {
        if (err) {
          console.error('❌ Error al verificar:', err);
        } else {
          console.log('📋 Columnas finales:', rows.map(r => r.name).join(', '));
          console.log('✅ Migración completada');
        }
        db.close();
      });
    }, 500);
  });
});
EOF