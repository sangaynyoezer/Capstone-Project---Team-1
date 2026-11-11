import React, { useEffect, useState } from 'react';
import { 
  ChevronDown, ChevronUp, BookmarkCheck, CheckCircle2, 
  Upload, Download, FileText, Plus, ExternalLink, Trash2, 
  Sparkles, Check, Paperclip, FolderPlus
} from 'lucide-react';
import { COURSE_MATERIALS, type TeacherMaterial } from '../../materialsConfig';
import {
  deleteTeacherResource,
  loadTeacherResources,
  MAX_RESOURCE_FILE_SIZE,
  supabase,
  uploadTeacherResource,
} from '../../lib/supabase';

interface NotesScreenProps {
  reviewedNotes: number[];
  onToggleNote: (id: number) => void;
}

const STORAGE_TEACHER_MATERIALS_KEY = 'recognai_teacher_materials_v1';
const RESOURCE_CATEGORIES = [
  'Curriculum Guide',
  'Lesson Plan',
  'Worksheet',
  'Slide Resource',
  'Rubric',
] as const;
const MATERIAL_FILE_TYPES = ['PDF', 'DOCX', 'PPTX', 'LINK'] as const;

function isResourceCategory(value: string): value is TeacherMaterial['category'] {
  return RESOURCE_CATEGORIES.some((category) => category === value);
}

function isMaterialFileType(value: string): value is TeacherMaterial['fileType'] {
  return MATERIAL_FILE_TYPES.some((fileType) => fileType === value);
}

export const NotesScreen: React.FC<NotesScreenProps> = ({
  reviewedNotes,
  onToggleNote,
}) => {
  // Load custom uploaded/added teacher materials from localStorage, merging with defaults
  const [customMaterials, setCustomMaterials] = useState<TeacherMaterial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TEACHER_MATERIALS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return COURSE_MATERIALS.teacherMaterials || [];
  });
  const [cloudMaterials, setCloudMaterials] = useState<TeacherMaterial[]>([]);
  const [teacherUserId, setTeacherUserId] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoadingResources, setIsLoadingResources] = useState<boolean>(Boolean(supabase));
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [resourceError, setResourceError] = useState<string>('');

  // Modal / form state for uploading/linking a new material
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Curriculum Guide' | 'Lesson Plan' | 'Worksheet' | 'Slide Resource' | 'Rubric'>('Curriculum Guide');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDownloadUrl, setNewDownloadUrl] = useState<string>('');
  const [newFileType, setNewFileType] = useState<'PDF' | 'DOCX' | 'PPTX' | 'LINK'>('PDF');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileSize, setNewFileSize] = useState<string>('1.2 MB');
  const [newBadge, setNewBadge] = useState<string>('TEACHER RESOURCE');
  const [successToast, setSuccessToast] = useState<string>('');

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setTeacherUserId(session?.user.id ?? null);
      setIsSignedIn(Boolean(session?.user));
      setIsTeacher(session?.user.app_metadata.role === 'teacher');
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setResourceError(`Could not check your teacher permissions: ${error.message}`);
        return;
      }
      setTeacherUserId(data.session?.user.id ?? null);
      setIsSignedIn(Boolean(data.session?.user));
      setIsTeacher(data.session?.user.app_metadata.role === 'teacher');
    }).catch((error: unknown) => {
      if (active) {
        setResourceError(error instanceof Error ? error.message : 'Could not check your teacher permissions.');
      }
    });

    void loadTeacherResources().then((materials) => {
      if (active) setCloudMaterials(materials);
    }).catch((error: unknown) => {
      if (active) {
        setResourceError(error instanceof Error ? error.message : 'Could not load shared teacher resources.');
      }
    }).finally(() => {
      if (active) setIsLoadingResources(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const canManageResources = Boolean(teacherUserId && isSignedIn && isTeacher);

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageResources) {
      setResourceError('Only signed-in accounts approved with the teacher role can add or upload resources.');
      return;
    }
    if (!newTitle.trim()) return;

    setResourceError('');
    if (newFile && newDownloadUrl.trim()) {
      setResourceError('Choose a device file or enter a resource link, not both.');
      return;
    }

    if (newFile) {
      if (!teacherUserId || !isTeacher) {
        setResourceError('Sign in with an account that has been granted the teacher role to upload files.');
        return;
      }

      setIsUploading(true);
      try {
        const newItem = await uploadTeacherResource(newFile, teacherUserId, {
          title: newTitle,
          category: newCategory,
          description: newDescription || 'Classroom resource shared by a teacher.',
        });
        setCloudMaterials((previous) => [newItem, ...previous]);
        setSuccessToast(`"${newItem.title}" uploaded and shared with the class!`);
      } catch (error) {
        setResourceError(error instanceof Error ? error.message : 'Could not upload this resource.');
        return;
      } finally {
        setIsUploading(false);
      }
    } else {
      const newItem: TeacherMaterial = {
        id: `custom-mat-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        description: newDescription.trim() || 'Custom pedagogical resource uploaded for Class IX DTI educators and learners.',
        downloadUrl: newDownloadUrl.trim(),
        fileType: newDownloadUrl.trim() ? 'LINK' : newFileType,
        fileSize: newFileSize.trim() || 'Web Link',
        badge: newBadge.trim().toUpperCase() || 'RESOURCE HUB',
        tags: ['Class IX DTI', newCategory],
      };

      const updated = [newItem, ...customMaterials];
      try {
        localStorage.setItem(STORAGE_TEACHER_MATERIALS_KEY, JSON.stringify(updated));
      } catch (error) {
        setResourceError(error instanceof Error ? `Could not save this resource in this browser: ${error.message}` : 'Could not save this resource in this browser.');
        return;
      }
      setCustomMaterials(updated);

      setSuccessToast(`"${newItem.title}" added to Teacher Materials!`);
    }

    setNewTitle('');
    setNewDescription('');
    setNewDownloadUrl('');
    setNewFile(null);
    setIsAddModalOpen(false);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleDeleteMaterial = async (material: TeacherMaterial) => {
    setResourceError('');
    if (!canManageResources) {
      setResourceError('Only signed-in accounts approved with the teacher role can remove resources.');
      return;
    }
    if (material.storagePath) {
      if (!teacherUserId) {
        setResourceError('Sign in with the teacher account that uploaded this file to remove it.');
        return;
      }
      try {
        await deleteTeacherResource(material.id, material.storagePath, teacherUserId);
        setCloudMaterials((previous) => previous.filter((item) => item.id !== material.id));
      } catch (error) {
        setResourceError(error instanceof Error ? error.message : 'Could not remove this uploaded resource.');
      }
      return;
    }

    const id = material.id;
    const updated = customMaterials.filter((m) => m.id !== id);
    setCustomMaterials(updated);
    try {
      localStorage.setItem(STORAGE_TEACHER_MATERIALS_KEY, JSON.stringify(updated));
    } catch (error) {
      setResourceError(error instanceof Error ? error.message : 'Could not update saved resources in this browser.');
    }
  };

  const sections = [
    {
      id: 1,
      title: 'Section 1: Key Concepts',
      content: (
        <div className="space-y-3">
          <p className="text-slate-300">
            Recognition systems operate primarily as <strong className="text-white">Classification Models</strong> (discretely bucketing data) rather than <strong className="text-white">Regression Models</strong> (predicting continuous numeric vectors). To process raw sensory matrices, high-performance machines execute a concentric pipeline of steps:
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>
              <strong className="text-[#00f5c4]">• Normalization:</strong> Rescaling pixels to balance lighting and geometric distortion.
            </li>
            <li>
              <strong className="text-[#00f5c4]">• Landmark Alignment:</strong> Pinpointing fixed physiological markers (e.g. eye corners or fingerprints ridge bifurcations).
            </li>
            <li>
              <strong className="text-[#00f5c4]">• Confidence Estimation:</strong> Yielding statistical percentages of matching predictions instead of absolute 100% binary outputs.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Section 2: Important Terminology',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Quick glossary of chapter terms to write in your physical notebooks:
          </p>
          <div className="space-y-1">
            <h5 className="text-[#00f5c4] font-bold">Biometric Template</h5>
            <p className="text-slate-300">
              The encrypted, numeric vector file storing personal features in secure DB tables.
            </p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[#00f5c4] font-bold">OCR (Optical Character Recognition)</h5>
            <p className="text-slate-300">
              Computational system converting graphic text matrices directly into digital ASCII strings.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Section 3: Additional Examples',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Automated License Plate Recognition (ALPR) at highway toll gates utilizing edge-preserving Sobel convolution filters.
          </p>
          <p>
            • Iris scanning at international border customs evaluating concentric contraction patterns in human eye rings.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Section 4: Interesting Facts',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Did you know that identical twins share identical DNA, but have distinctly unique fingerprints and retinal vascular maps?
          </p>
          <p>
            • Modern smartphone 3D scanners cast over 30,000 invisible infrared dots onto the user face to prevent 2D photo spoofing.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Section 5: Practical Applications',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Hospital Patient Verification: Instantaneous patient ID retrieval to prevent medication administration errors.
          </p>
          <p>
            • ATM Cardless Cash: Iris and fingerprint two-factor biometric authentication eliminating lost plastic cards.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Section 6: Ethical Considerations',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Data Sovereignty: Ensuring biometric templates cannot be harvested or reverse-engineered into raw sensory images.
          </p>
          <p>
            • Demographic Fairness: Actively testing algorithms across diverse ages, skin tones, and lighting conditions to eradicate bias.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Section 7: Benefits & Limitations Deep Dive',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Advantages: Instantaneous throughput, zero credential loss, hygienic hands-free access control.
          </p>
          <p>
            • Challenges: High server equipment investment, potential failure during sensor lens fogging or brownout power grid cuts.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Section 8: Further Learning Points',
      content: (
        <div className="space-y-2 text-slate-300">
          <p>
            • Explore Convolutional Neural Networks (CNNs) in Chapter 11.
          </p>
          <p>
            • Experiment with open-source OpenCV Python scripts during your Class IX science fair projects.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b16] py-12 px-6 sm:px-12 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
              <span>DTI SYLLABUS EXPANSION</span>
              <span>•</span>
              <span>TEACHER & LEARNER RESOURCES</span>
            </div>

            {/* Reading progress pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b1222] border border-[#1b2b48] text-xs font-mono text-[#00f5c4]">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{reviewedNotes.length} of 8 Sections Read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Additional Learning Notes & Resources
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            These class notes supplement standard Class IX DTI textbooks. Teachers can share lesson plans, study guides, handouts, and rubrics below for learners to access.
          </p>

          {/* Success toast */}
          {successToast && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{successToast}</span>
            </div>
          )}
          {resourceError && (
            <div role="alert" className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs">
              {resourceError}
            </div>
          )}
        </div>

        {/* --------------------------------------------------------------------------------- */}
        {/* SECTION: ADDITIONAL TEACHER AND LEARNER TOOLS (REQUESTED BY USER) */}
        {/* --------------------------------------------------------------------------------- */}
        <div id="additional-tools" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1428] via-[#09101f] to-[#060a14] border-2 border-[#1f3358] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#182845]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  TEACHER & LEARNER ZONE
                </span>
                <span className="text-xs font-mono text-slate-400">Class IX DTI Chapter 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Additional Teacher and Learner Tools</span>
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl">
                Access shared resources, or let authorized teachers upload lesson plans, rubrics, and activity sheets from their devices.
              </p>
            </div>

            {/* Upload / Add Material Button */}
            <div className="flex flex-col items-start gap-2 self-start sm:items-end sm:self-auto">
              <button
                onClick={() => {
                  if (canManageResources) {
                    setResourceError('');
                    setIsAddModalOpen(true);
                  }
                }}
                disabled={!canManageResources}
                title={canManageResources ? 'Add or upload a course resource' : 'Only approved teacher accounts can add resources'}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.3)] flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Add Material</span>
              </button>
              {!canManageResources && (
                <span className="max-w-xs text-[10px] leading-relaxed text-amber-200 sm:text-right">
                  {isSignedIn
                    ? 'Adding and uploading materials is restricted to accounts approved with the teacher role.'
                    : 'Sign in with an administrator-approved teacher account to add or upload materials.'}
                </span>
              )}
            </div>
          </div>

          {/* Cards Grid for Teacher Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingResources && (
              <p role="status" className="text-xs text-cyan-200 md:col-span-2 lg:col-span-3">
                Loading shared teacher resources...
              </p>
            )}
            {[...cloudMaterials, ...customMaterials].map((mat) => (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-[#080e1b] border border-[#192b4a] hover:border-[#00f5c4]/50 transition-all flex flex-col justify-between space-y-4 group shadow-md"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 text-cyan-300">
                      {mat.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {mat.fileType} • {mat.fileSize || 'Web'}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm group-hover:text-[#00f5c4] transition-colors leading-snug">
                    {mat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {mat.description}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {mat.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#14233c] flex items-center justify-between gap-2">
                  {mat.downloadUrl ? (
                    <a
                      href={mat.downloadUrl}
                      target={mat.storagePath ? undefined : '_blank'}
                      rel={mat.storagePath ? undefined : 'noopener noreferrer'}
                      download={mat.storagePath ? `${mat.title}.${mat.fileType.toLowerCase()}` : undefined}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d182e] hover:bg-[#16274a] text-[#00f5c4] border border-[#00f5c4]/30 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{mat.storagePath ? 'Download Resource' : 'Open Resource'}</span>
                      {!mat.storagePath && <ExternalLink className="w-3 h-3 opacity-60" />}
                    </a>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-mono">
                      <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                      <span>Material Template Ready</span>
                    </div>
                  )}

                  {canManageResources && (
                    !mat.storagePath
                      ? mat.id.startsWith('custom-mat-')
                      : mat.uploadedBy === teacherUserId
                  ) && (
                    <button
                      onClick={() => void handleDeleteMaterial(mat)}
                      title="Remove this material"
                      aria-label={`Remove ${mat.title}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------------------------- */}
        {/* TWO-COLUMN GRID: 8 CURRICULUM ACCORDION SECTIONS + REVISION & SOURCES */}
        {/* --------------------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 8 Accordion Sections */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1 pb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
                CURRICULUM SUBTOPIC NOTES
              </span>
              <h2 className="text-xl font-bold text-white">Classroom Study Sections</h2>
            </div>

            {sections.map((sec) => {
              const isOpen = reviewedNotes.includes(sec.id);
              return (
                <div
                  key={sec.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#00f5c4] bg-[#0b1222] shadow-[0_0_15px_rgba(0,245,196,0.12)]'
                      : 'border-[#1b2b48] bg-[#090e1b] hover:border-slate-500'
                  }`}
                >
                  <button
                    onClick={() => onToggleNote(sec.id)}
                    className="w-full p-5 flex items-center justify-between text-left text-sm font-bold text-white group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {isOpen ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00f5c4] flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                      )}
                      <span className={isOpen ? 'text-[#00f5c4]' : 'text-white group-hover:text-slate-200'}>
                        {sec.title}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#00f5c4]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs leading-relaxed border-t border-[#162540] animate-in fade-in duration-150">
                      {sec.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Quick Reference & References & Sources */}
          <div className="lg:col-span-5 space-y-6">
            {/* Revision Panel: Quick Reference */}
            <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
                  REVISION PANEL
                </span>
                <h3 className="text-xl font-bold text-white">
                  Quick Reference
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Sensory Input</h4>
                  <p className="text-slate-400 leading-relaxed">
                    The first stage where raw data is gathered by physical camera or acoustic mic arrays.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-white font-bold">Pre-Processing</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Stripping noise matrices, normalizing light values, and preparing pristine feature vectors.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-white font-bold">Matrix Matching</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Neural network grids executing similarity calculations against registered user datasets.
                  </p>
                </div>
              </div>
            </div>

            {/* References & Sources Card */}
            <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">
                References & Sources
              </h3>

              <ul className="space-y-3 text-xs text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#00f5c4] font-bold">1.</span>
                  <span>*AI and Biometrics in Education*, Technology Academic Journal, 2024.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f5c4] font-bold">2.</span>
                  <span>*Class IX DTI Curriculum Reference Chapter 10: AI Recognition Systems*, 2025.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------- */}
      {/* MODAL: UPLOAD / ADD TEACHER & LEARNER MATERIAL FORM */}
      {/* --------------------------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0b1222] border border-[#21355a] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#182845]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00f5c4]">
                  NEW TEACHER & LEARNER RESOURCE
                </span>
                <h3 className="text-xl font-bold text-white">Add Classroom Resource</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Material Title *</label>
                <input
                  type="text"
                  required
                  maxLength={160}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Class IX DTI Chapter 10 Discussion Guide & Case Handout"
                  className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Resource Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      if (isResourceCategory(e.target.value)) setNewCategory(e.target.value);
                    }}
                    className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                  >
                    <option value="Curriculum Guide">Curriculum Guide</option>
                    <option value="Lesson Plan">Lesson Plan</option>
                    <option value="Worksheet">Worksheet</option>
                    <option value="Slide Resource">Slide Resource</option>
                    <option value="Rubric">Rubric</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">File Format</label>
                  <select
                    value={newFileType}
                    onChange={(e) => {
                      if (isMaterialFileType(e.target.value)) setNewFileType(e.target.value);
                    }}
                    className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word Document (.docx)</option>
                    <option value="PPTX">PowerPoint Deck (.pptx)</option>
                    <option value="LINK">Web Link / Google Doc</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Description / Teacher Notes</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain how teachers should use this file in the classroom or during practical computer lab sessions."
                  className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="teacher-resource-file" className="text-slate-300 font-semibold">
                  Upload a file from this device
                </label>
                <input
                  id="teacher-resource-file"
                  type="file"
                  accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setResourceError('');
                    if (file && file.size > MAX_RESOURCE_FILE_SIZE) {
                      setNewFile(null);
                      setResourceError('Choose a file that is no larger than 20 MB.');
                      e.target.value = '';
                      return;
                    }
                    setNewFile(file);
                    if (file) {
                      setNewDownloadUrl('');
                      const extension = file.name.split('.').pop()?.toLowerCase();
                      if (extension === 'pdf' || extension === 'docx' || extension === 'pptx') {
                        setNewFileType(extension.toUpperCase() as 'PDF' | 'DOCX' | 'PPTX');
                      }
                    }
                  }}
                  className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#00f5c4] file:px-3 file:py-2 file:text-xs file:font-bold file:text-[#070b16]"
                />
                <span className="block text-[10px] text-slate-400">
                  PDF, DOCX, or PPTX; maximum 20 MB. Uploaded files are shared with the class.
                </span>
                {newFile && (
                  <span className="block break-all text-[10px] text-cyan-200">
                    Selected: {newFile.name} ({(newFile.size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                )}
                {!supabase ? (
                  <span className="block text-[10px] text-amber-200">
                    Configure Supabase before uploading shared files.
                  </span>
                ) : !teacherUserId ? (
                  <span className="block text-[10px] text-amber-200">
                    Sign in with an authorized teacher account to upload a shared file.
                  </span>
                ) : !isTeacher ? (
                  <span className="block text-[10px] text-amber-200">
                    This account does not have the teacher role. Ask your Supabase project administrator to grant it.
                  </span>
                ) : (
                  <span className="block text-[10px] text-emerald-300">
                    Teacher access confirmed. Your file will be available to all course visitors.
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Or add an external resource link</label>
                <input
                  type="url"
                  value={newDownloadUrl}
                  onChange={(e) => setNewDownloadUrl(e.target.value)}
                  disabled={Boolean(newFile)}
                  placeholder="https://drive.google.com/... or https://your-school.edu/handout.pdf"
                  className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-white focus:outline-none focus:border-[#00f5c4]"
                />
                <span className="text-[10px] text-slate-400">
                  Links continue to be saved in this browser; upload a file above to share a resource across devices.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#182845]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0f172a] text-slate-300 hover:text-white border border-[#21355a] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || (Boolean(newFile) && (!isTeacher || !teacherUserId))}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.3)] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : newFile ? 'Upload & Share with Class' : 'Upload Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
