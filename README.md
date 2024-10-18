Hier ist eine strukturierte und gut lesbare **README**-Datei basierend auf deinen Notizen zur App-Entwicklung für iOS:

---

# App Entwicklung für iOS

Dies ist ein Projekt zur Entwicklung einer iOS-App mit React Native und Expo. Die App bietet Funktionen wie das Erstellen und Verwalten von Rezepten, das Scannen von Lebensmitteln und das Filtern nach Unverträglichkeiten.

## Voraussetzungen

Stelle sicher, dass du die folgenden Tools installiert hast:
- Node.js und npm
- Git

## Projekt starten

Um das Projekt zu starten, führe den folgenden Befehl im Projektordner aus:

```bash
npm start
```

Dies startet den Entwicklungsserver von Expo. 

Zum Beenden des Servers kannst du den folgenden Befehl verwenden:

```bash
Strg + C
```

Zum Neuladen der App im Emulator oder auf einem physischen Gerät kannst du `r` drücken.

## Git Workflow

### Änderungen vorbereiten und hochladen

1. **Alle Dateien zum Commit hinzufügen**:
   
   ```bash
   git add .
   ```

2. **Änderungen committen**:

   ```bash
   git commit -m "Kommentar hier"
   ```

3. **Änderungen zum Remote-Repository pushen**:

   ```bash
   git push origin main
   ```

## Hinweise zur Tab-Navigation

In der App wird eine Tab-Navigation verwendet. Hier ist eine wichtige Notiz zur richtigen Handhabung von ScrollViews und SafeAreaViews:

- **SafeAreaView und ScrollView**: ScrollViews und allgemeine Containerfenster dürfen keine `SafeAreaView` haben. Stattdessen sollte eine einfache `View`-Komponente verwendet werden, und die `ScrollView` sollte innerhalb dieser `View` platziert werden. Die `ScrollView` kann den Abstand nach oben definieren, um die Notch zu umgehen. 
   
   Beispiel für eine Lösung:

   ```jsx
   <View className="bg-secondary flex-1">
      <ScrollView className="flex-1 px-4 mt-10">
         {/* Inhalt */}
      </ScrollView>
   </View>
   ```

- In diesem Beispiel wird mit `mt-10` sichergestellt, dass der Inhalt unterhalb der Notch beginnt, um visuelle Probleme zu vermeiden.
