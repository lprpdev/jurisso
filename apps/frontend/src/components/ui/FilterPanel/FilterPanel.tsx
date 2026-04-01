'use client';

import type { SearchFilters, DocumentType } from '@jurisso/shared';
import { Select } from '@/components/ui/Select/Select';
import styles from './FilterPanel.module.css';

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'decision', label: 'Decision' },
  { value: 'loi', label: 'Loi' },
  { value: 'decret', label: 'Decret' },
  { value: 'ordonnance', label: 'Ordonnance' },
  { value: 'circulaire', label: 'Circulaire' },
  { value: 'code', label: 'Code' },
  { value: 'article', label: 'Article' },
];

const JURISDICTIONS = [
  { value: '', label: 'Toutes les juridictions' },
  { value: 'cour_cassation', label: 'Cour de cassation' },
  { value: 'conseil_etat', label: "Conseil d'Etat" },
  { value: 'conseil_constitutionnel', label: 'Conseil constitutionnel' },
  { value: 'cour_appel', label: "Cour d'appel" },
  { value: 'tribunal_judiciaire', label: 'Tribunal judiciaire' },
];

const MATTERS = [
  { value: '', label: 'Toutes les matieres' },
  { value: 'civil', label: 'Droit civil' },
  { value: 'penal', label: 'Droit penal' },
  { value: 'commercial', label: 'Droit commercial' },
  { value: 'travail', label: 'Droit du travail' },
  { value: 'administratif', label: 'Droit administratif' },
  { value: 'fiscal', label: 'Droit fiscal' },
];

const SOLUTIONS = [
  { value: '', label: 'Toutes les solutions' },
  { value: 'rejet', label: 'Rejet' },
  { value: 'cassation', label: 'Cassation' },
  { value: 'cassation_partielle', label: 'Cassation partielle' },
  { value: 'irrecevabilite', label: 'Irrecevabilite' },
  { value: 'non_lieu', label: 'Non-lieu' },
];

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  function handleTypeToggle(type: DocumentType) {
    const current = filters.type ?? [];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange({ ...filters, type: next.length > 0 ? next : undefined });
  }

  function handleReset() {
    onChange({});
  }

  return (
    <aside className={styles.panel} aria-label="Filtres de recherche">
      {/* Document type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Type de document</h3>
        <div className={styles.checkboxGroup}>
          {DOCUMENT_TYPES.map((dt) => (
            <label key={dt.value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={filters.type?.includes(dt.value) ?? false}
                onChange={() => handleTypeToggle(dt.value)}
              />
              {dt.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.separator} />

      {/* Jurisdiction */}
      <div className={styles.section}>
        <Select
          label="Juridiction"
          options={JURISDICTIONS}
          value={filters.jurisdiction ?? ''}
          onChange={(v) =>
            onChange({ ...filters, jurisdiction: v || undefined })
          }
          placeholder="Toutes les juridictions"
        />
      </div>

      <div className={styles.separator} />

      {/* Matter */}
      <div className={styles.section}>
        <Select
          label="Matiere"
          options={MATTERS}
          value={filters.matter ?? ''}
          onChange={(v) => onChange({ ...filters, matter: v || undefined })}
          placeholder="Toutes les matieres"
        />
      </div>

      <div className={styles.separator} />

      {/* Date range */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Periode</h3>
        <div className={styles.dateRange}>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dateFrom ?? ''}
            onChange={(e) =>
              onChange({ ...filters, dateFrom: e.target.value || undefined })
            }
            aria-label="Date de debut"
          />
          <span className={styles.dateSep}>au</span>
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dateTo ?? ''}
            onChange={(e) =>
              onChange({ ...filters, dateTo: e.target.value || undefined })
            }
            aria-label="Date de fin"
          />
        </div>
      </div>

      <div className={styles.separator} />

      {/* Solution */}
      <div className={styles.section}>
        <Select
          label="Solution"
          options={SOLUTIONS}
          value={filters.solution ?? ''}
          onChange={(v) =>
            onChange({ ...filters, solution: v || undefined })
          }
          placeholder="Toutes les solutions"
        />
      </div>

      <div className={styles.separator} />

      <button type="button" className={styles.resetBtn} onClick={handleReset}>
        Reinitialiser les filtres
      </button>
    </aside>
  );
}
