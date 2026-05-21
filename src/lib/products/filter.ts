import type { Gem } from "./data";
import { colorMatches } from "./data";
import type { FilterState } from "./store";

export function applyFilters(gems: Gem[], f: FilterState): Gem[] {
  const term = f.search.trim().toLowerCase();
  let out = gems.filter((g) => {
    if (term && !(g.name + g.id + g.variety + g.colorName).toLowerCase().includes(term)) return false;
    if (f.variety && g.variety !== f.variety) return false;
    if (f.origin && g.origin !== f.origin) return false;
    if (f.shape && g.shape !== f.shape) return false;
    if (f.color && !g.colorName.toLowerCase().includes(f.color.toLowerCase()) && !colorMatches(g.color, f.color)) return false;
    if (f.clarity && g.clarity !== f.clarity) return false;
    if (f.certified && g.certified !== f.certified) return false;
    if (f.treated && g.treated !== f.treated) return false;
    if (f.phenomena && !g.star && !g.catEye) return false;
    if (f.availability !== "All" && g.condition !== f.availability) return false;
    if (g.carat < f.carat[0] || g.carat > f.carat[1]) return false;
    if (g.price < f.price[0] || g.price > f.price[1]) return false;
    if (g.length < f.length[0] || g.length > f.length[1]) return false;
    if (g.width  < f.width[0]  || g.width  > f.width[1])  return false;
    if (g.height < f.height[0] || g.height > f.height[1]) return false;
    return true;
  });

  switch (f.sort) {
    case "oldest":     out = [...out].reverse(); break;
    case "price-asc":  out = [...out].sort((a, b) => a.price - b.price); break;
    case "price-desc": out = [...out].sort((a, b) => b.price - a.price); break;
    case "carat-desc": out = [...out].sort((a, b) => b.carat - a.carat); break;
    case "name-asc":   out = [...out].sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  return out;
}
