/**
 * Minimaler robots.txt-Leser nach RFC 9309:
 * Gruppen je User-agent, längste passende Regel gewinnt, Allow schlägt
 * Disallow bei gleicher Länge. Unterstützt * und $.
 */
interface Rule {
  allow: boolean;
  pattern: string;
}

interface Group {
  agents: string[];
  rules: Rule[];
}

export function parseRobots(txt: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;
  for (const rawLine of txt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if (key === 'user-agent') {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (key === 'allow' || key === 'disallow') {
      lastWasAgent = false;
      if (!current) continue;
      if (key === 'disallow' && value === '') continue;
      current.rules.push({ allow: key === 'allow', pattern: value });
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function patternToRegex(pattern: string): RegExp {
  let src = '';
  for (const ch of pattern) {
    if (ch === '*') src += '.*';
    else if (ch === '$') src += '$';
    else src += ch.replace(/[.+?^{}()|[\]\\]/g, '\\$&');
  }
  return new RegExp('^' + src);
}

export function isAllowed(txt: string, userAgentToken: string, pathWithQuery: string): boolean {
  const groups = parseRobots(txt);
  const token = userAgentToken.toLowerCase();
  let group = groups.filter((g) => g.agents.some((a) => a !== '*' && token.includes(a)));
  if (group.length === 0) group = groups.filter((g) => g.agents.includes('*'));
  const rules = group.flatMap((g) => g.rules);
  let best: Rule | null = null;
  for (const rule of rules) {
    if (!patternToRegex(rule.pattern).test(pathWithQuery)) continue;
    if (
      !best ||
      rule.pattern.length > best.pattern.length ||
      (rule.pattern.length === best.pattern.length && rule.allow && !best.allow)
    ) {
      best = rule;
    }
  }
  return best ? best.allow : true;
}
