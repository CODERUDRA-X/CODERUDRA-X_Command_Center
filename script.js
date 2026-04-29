const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const promptEl = document.getElementById("prompt");

// ---------------- STATE ----------------
const state = {
  currentPath: ["home"],
  history: [],
  historyIndex: -1
};

// ---------------- FILE SYSTEM ----------------
const fs = {
  home: {
    "about.txt": "Shreyansh Srivastava\nBTech CSE (Data Science)\nFocus: AI + Systems",
    "skills.txt": "C, C++, JS (Learning)\nAI/ML (Beginner)",
    projects: {
      "ecosanjeevani.txt": "Biofuel from waste concept project",
      "terminal.txt": "Terminal Portfolio v0.2"
    },
    "contact.txt": "Email: yourmail@example.com\nGitHub: github.com/dragonblastz"
  }
};

// ---------------- UTILS ----------------
function getCurrentDir() {
  let dir = fs;
  for (let p of state.currentPath) {
    dir = dir[p];
  }
  return dir;
}

function updatePrompt() {
  promptEl.textContent =
    "dragon@portfolio:~/" + state.currentPath.join("/") + "$";
}

function print(text) {
  const line = document.createElement("div");
  line.className = "output-line";
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// ---------------- COMMANDS ----------------
const commands = {
  help: () =>
`help, about, skills, projects, contact
ls, cd, cat, pwd, clear`,

  about: () => fs.home["about.txt"],
  skills: () => fs.home["skills.txt"],
  projects: () => "Use: cd projects → ls → cat filename",
  contact: () => fs.home["contact.txt"],

  pwd: () => "/" + state.currentPath.join("/"),

  ls: () => {
    const dir = getCurrentDir();
    return Object.keys(dir).join("   ");
  },

  cd: (args) => {
    if (!args[0]) return "Usage: cd <folder>";

    if (args[0] === "..") {
      if (state.currentPath.length > 1) state.currentPath.pop();
      updatePrompt();
      return "";
    }

    const dir = getCurrentDir();
    if (dir[args[0]]) {
      state.currentPath.push(args[0]);
      updatePrompt();
      return "";
    } else {
      return "Folder not found";
    }
  },

  cat: (args) => {
    const dir = getCurrentDir();
    if (!args[0]) return "Usage: cat <file>";

    if (dir[args[0]]) return dir[args[0]];
    return "File not found";
  },

  clear: () => {
    output.innerHTML = "";
    return "";
  }
};

// ---------------- PARSER ----------------
function parse(input) {
  const parts = input.split(" ");
  return {
    command: parts[0],
    args: parts.slice(1)
  };
}

// ---------------- INPUT HANDLER ----------------
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();

    print(promptEl.textContent + " " + value);

    if (value) {
      state.history.push(value);
      state.historyIndex = state.history.length;
    }

    const { command, args } = parse(value);

    if (commands[command]) {
      const result = commands[command](args);
      if (result) print(result);
    } else {
      print("Command not found");
    }

    input.value = "";
  }

  // HISTORY NAV
  if (e.key === "ArrowUp") {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      input.value = state.history[state.historyIndex];
    }
  }

  if (e.key === "ArrowDown") {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      input.value = state.history[state.historyIndex];
    } else {
      input.value = "";
    }
  }
});

// ---------------- INIT ----------------
updatePrompt();
print("Shreyansh Terminal v0.2");
print("Type 'help'");