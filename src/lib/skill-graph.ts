import { experience, education, reforge } from "./resume";
import { projects } from "./projects";
import { caseStudies, caseworkUrl } from "./casework";
import { uniProjects } from "./uni";

// The /skills explorer. Every skill points at the places it was actually used
// (jobs, projects, case studies, the Lab, education, courses) by source id, so
// links never drift from the resume or project data they come from.
// Voice: plain, declarative, no em dashes.

export type SourceKind = "work" | "project" | "casework" | "lab" | "education" | "course";

export type Source = {
  id: string;
  kind: SourceKind;
  title: string;
  org?: string;
  period?: string;
  href: string;
  external?: boolean;
};

export type AreaId =
  | "llm"
  | "evals"
  | "ml"
  | "nlp"
  | "retrieval"
  | "frontend"
  | "backend"
  | "delivery"
  | "testing"
  | "product"
  | "leadership"
  | "design"
  | "ai"
  | "data"
  | "recsys";

export type Skill = {
  name: string;
  area: AreaId;
  /** simple-icons export name, e.g. "siPytorch" (see skill-icon.tsx). */
  icon?: string;
  note?: string;
  usedIn: string[];
};

export const kindLabel: Record<SourceKind, string> = {
  work: "Work",
  project: "Projects",
  casework: "Case studies",
  lab: "Lab & research",
  education: "Education",
  course: "Courses & programs",
};

export const areas: { id: AreaId; label: string }[] = [
  { id: "llm", label: "LLMs & agents" },
  { id: "evals", label: "Evaluation & safety" },
  { id: "ml", label: "ML & research" },
  { id: "ai", label: "AI foundations" },
  { id: "recsys", label: "Recommender systems" },
  { id: "data", label: "Big data" },
  { id: "nlp", label: "NLP & LLM internals" },
  { id: "retrieval", label: "Retrieval & vectors" },
  { id: "product", label: "Product management" },
  { id: "frontend", label: "Front end" },
  { id: "backend", label: "Back end & data" },
  { id: "delivery", label: "Cloud & delivery" },
  { id: "testing", label: "Testing" },
  { id: "leadership", label: "Leadership & delivery" },
  { id: "design", label: "Design" },
];

// ---- Sources -----------------------------------------------------------------

const courseId = (code: string) => `unsw-${code.toLowerCase()}`;

const fromResume = (kind: SourceKind, entries: typeof experience): Source[] =>
  entries
    .filter((e) => e.id)
    .map((e) => ({
      id: e.id!,
      kind,
      title: e.title,
      org: e.org,
      period: e.period || undefined,
      href: e.link ?? `/resume#${e.id}`,
      external: e.link ? true : undefined,
    }));

export const sources: Source[] = [
  ...fromResume("work", experience),
  ...projects.map((p) => ({
    id: p.slug,
    kind: "project" as const,
    title: p.title,
    org: p.category.split(" / ")[0],
    href: `/projects/${p.slug}`,
  })),
  {
    id: "pitchscore-ai",
    kind: "project",
    title: "PitchScore AI",
    org: "Spoken pitch practice",
    href: "https://github.com/devwithjp/pitchscore-ai",
    external: true,
  },
  ...uniProjects.map((u) => ({
    id: u.slug,
    kind: "project" as const,
    title: u.title.split(":")[0],
    org: u.kind,
    href: `/projects#${u.slug}`,
  })),
  ...caseStudies.map((c) => ({
    id: c.slug,
    kind: "casework" as const,
    title: c.title,
    org: `${c.company} · ${c.skill}`,
    href: `${caseworkUrl}/${c.slug}`,
  })),
  { id: "interp", kind: "lab", title: "Interpretability research", org: "UNSW · NLP", href: "/projects/lab#interp" },
  { id: "lab-nlp", kind: "lab", title: "NLP implementation pack", org: "13 notebooks", href: "/projects/lab#packs" },
  { id: "lab-llm", kind: "lab", title: "Advanced LLM systems pack", org: "32 notebooks", href: "/projects/lab#packs" },
  ...fromResume("education", education),
  // Each UNSW course is its own source, so a skill points at the course that taught it.
  ...education.flatMap((e) =>
    (e.courses ?? []).map((c) => ({
      id: courseId(c.code),
      kind: "education" as const,
      title: c.title,
      org: e.org?.split(" · ")[0],
      href: `/resume#${e.id}`,
    }))
  ),
  { id: "reforge", kind: "course", title: "Product Foundations", org: "Reforge", period: reforge.completed, href: "/resume#reforge" },
  { id: "andrew-ng-ml", kind: "course", title: "Machine Learning", org: "Coursera · Andrew Ng", href: "/resume#certifications" },
  { id: "unsw-leadership", kind: "course", title: "Leadership Foundations + Strategic Thinking", org: "UNSW · AGSM", href: "/resume#certifications" },
  { id: "pfc-2026", kind: "course", title: "Peter Farrell Cup, pitched Pedestal", org: "UNSW", period: "2026", href: "/projects#pedestal" },
  { id: "peter-farrell", kind: "course", title: "Peter Farrell Cup, Startup Pitch", org: "UNSW · Semi-finalist", period: "2025", href: "/resume#certifications" },
];

// ---- Skills ------------------------------------------------------------------

const PRODUCTS = ["agenteval-studio", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"];
const CASEWORK = caseStudies.map((c) => c.slug);
const ALL_APPS = [...PRODUCTS, "pitchscore-ai"];

export const skills: Skill[] = [
  // LLMs & agents
  { name: "Claude API (Anthropic)", area: "llm", icon: "siAnthropic", note: "The model behind all four products and the Casework app.", usedIn: [...PRODUCTS, ...CASEWORK] },
  { name: "OpenAI API", area: "llm", note: "Embeddings for SignalDesk; OpenAI-compatible providers in PitchScore.", usedIn: ["signaldesk-ai", "pitchscore-ai"] },
  { name: "Open-weight LLM providers", area: "llm", note: "Groq, Together AI, Hugging Face router behind one interface.", usedIn: ["pedestal", "pitchscore-ai"] },
  { name: "Ollama", area: "llm", icon: "siOllama", note: "Local model option for PitchScore.", usedIn: ["pitchscore-ai"] },
  { name: "Hugging Face Transformers", area: "llm", icon: "siHuggingface", note: "BERT, GPT and T5 hands-on in the Lab.", usedIn: ["lab-nlp", "lab-llm"] },
  { name: "Prompt engineering", area: "llm", note: "System prompts, rubrics, and judge prompts that hold up under test.", usedIn: ["pedestal", ...PRODUCTS, "pitchscore-ai", "airbnb-redteam", "rekro-pm"] },
  { name: "RAG", area: "llm", note: "Chunk, embed, cluster, retrieve, generate with a 2-plus-citation rule.", usedIn: ["signaldesk-ai", "lab-nlp", "lab-llm"] },
  { name: "Tool calling", area: "llm", note: "A manual tool-calling loop with typed tools.", usedIn: ["workflowpilot-safe-agents", "lab-llm"] },
  { name: "AI agents", area: "llm", note: "Planner plus tools, gated by human approval.", usedIn: ["workflowpilot-safe-agents", "lab-llm"] },
  { name: "Human-in-the-loop design", area: "llm", note: "Approval queues and an append-only audit trail.", usedIn: ["workflowpilot-safe-agents", "airbnb-redteam"] },
  { name: "Structured output", area: "llm", note: "Strict JSON schemas validated before render.", usedIn: ["screensense-qa", "agenteval-studio", "pitchscore-ai"] },
  { name: "Multimodal / vision", area: "llm", note: "Claude vision critiquing UI screenshots.", usedIn: ["pedestal", "screensense-qa", "lab-llm"] },
  { name: "Speech-to-text", area: "llm", note: "Whisper-compatible transcription of recorded pitches.", usedIn: ["pedestal", "pitchscore-ai"] },
  { name: "Fine-tuning (LoRA, SFT, DPO)", area: "llm", note: "Implemented on small models in the Lab.", usedIn: ["lab-nlp", "lab-llm"] },
  { name: "RLHF / GRPO", area: "llm", usedIn: ["lab-llm"] },
  { name: "LLMs (coursework)", area: "llm", usedIn: ["unsw-comp6713"] },

  { name: "DSPy", area: "llm", note: "Few-shot compilation for the Pedestal coach.", usedIn: ["pedestal"] },
  { name: "OpenRouter", area: "llm", usedIn: ["pedestal"] },

  // Evaluation & safety
  { name: "LLM evals", area: "evals", note: "Deterministic checks plus an LLM judge, scored per run.", usedIn: ["pedestal", "agenteval-studio", "duolingo-judge", "lab-nlp", "lab-llm"] },
  { name: "LLM-as-judge", area: "evals", note: "Built one, then calibrated one against human grades.", usedIn: ["pedestal", "agenteval-studio", "duolingo-judge", "pitchscore-ai"] },
  { name: "Judge calibration & kappa", area: "evals", usedIn: ["duolingo-judge", "lab-nlp"] },
  { name: "Release gates", area: "evals", note: "Ship / hold decisions backed by a scorecard.", usedIn: ["agenteval-studio", "spotify-dj-launch"] },
  { name: "Red-teaming", area: "evals", note: "Eight attack patterns against two system prompts.", usedIn: ["airbnb-redteam", "lab-llm"] },
  { name: "NIST AI RMF", area: "evals", note: "Failures filed into a NIST-mapped risk register.", usedIn: ["airbnb-redteam"] },
  { name: "AI risk & safety", area: "evals", usedIn: ["airbnb-redteam", "workflowpilot-safe-agents", "interp"] },
  { name: "ROUGE, BLEU, faithfulness", area: "evals", usedIn: ["lab-nlp"] },
  { name: "PII redaction & monitoring", area: "evals", usedIn: ["lab-nlp"] },
  { name: "Latency & cost observability", area: "evals", note: "Per-run latency and token cost on every call.", usedIn: ["agenteval-studio", "signaldesk-ai"] },

  { name: "DeepEval", area: "evals", note: "Judging rubrics for coached feedback.", usedIn: ["pedestal"] },
  { name: "Quality gates before billing", area: "evals", note: "No one pays until the live gate passes 8 of 10.", usedIn: ["pedestal"] },
  { name: "Privacy by design", area: "evals", note: "Raw video stays on the phone; only audio, metrics, and stills upload.", usedIn: ["pedestal", "pitchscore-ai"] },

  // ML & research
  { name: "Python", area: "ml", icon: "siPython", note: "Every Lab notebook and the research code.", usedIn: ["unsw-comp9021", "pedestal", "lab-nlp", "lab-llm", "interp", "inkers", "unsw-comp9814", "unsw-comp9444", "unsw-comp9313", "unsw-comp9727", "unsw-comp6713"] },
  { name: "PyTorch", area: "ml", icon: "siPytorch", usedIn: ["lab-nlp", "lab-llm", "interp", "unsw-comp9444", "unsw-comp9727"] },
  { name: "scikit-learn", area: "ml", icon: "siScikitlearn", usedIn: ["interp", "lab-nlp", "unsw-comp9814"] },
  { name: "Jupyter", area: "ml", icon: "siJupyter", note: "45 runnable notebooks.", usedIn: ["lab-nlp", "lab-llm", "interp"] },
  { name: "TransformerLens", area: "ml", note: "Residual-stream activations across five models.", usedIn: ["interp"] },
  { name: "Mechanistic interpretability", area: "ml", usedIn: ["interp", "lab-llm"] },
  { name: "Linear probing", area: "ml", note: "0.96+ probe accuracy with pair-aware CV.", usedIn: ["interp"] },
  { name: "Activation patching", area: "ml", note: "Confirmed the probed direction is causal.", usedIn: ["interp"] },
  { name: "Representation geometry (PCA)", area: "ml", usedIn: ["interp"] },
  { name: "Deep learning", area: "ml", usedIn: ["unsw-comp9517", "unsw-comp9444", "inkers", "andrew-ng-ml"] },
  { name: "Convolutional networks", area: "ml", note: "DenseNet to 79% on CIFAR-10 at Inkers; CNNs for images at UNSW.", usedIn: ["unsw-comp9517", "inkers", "unsw-comp9444"] },
  { name: "Behaviour cloning", area: "ml", note: "Steering-angle prediction prototype.", usedIn: ["inkers"] },
  // TODO(JP): confirm, inferred from the Inkers internship (2018 DenseNet work).
  { name: "Keras / TensorFlow", area: "ml", icon: "siTensorflow", usedIn: ["inkers"] },
  { name: "Machine learning foundations", area: "ml", usedIn: ["andrew-ng-ml", "unsw-comp9814"] },

  { name: "On-device ML (ML Kit)", area: "ml", note: "Face and pose landmarks for the presence layer.", usedIn: ["pedestal"] },

  // AI foundations (Extended AI)
  { name: "Search & problem solving", area: "ai", usedIn: ["unsw-comp9814"] },
  { name: "Optimisation", area: "ai", usedIn: ["unsw-comp9814", "unsw-comp9444"] },
  { name: "Logic & knowledge representation", area: "ai", usedIn: ["unsw-comp9814"] },
  { name: "Reasoning under uncertainty", area: "ai", note: "Probabilistic reasoning and Bayesian models.", usedIn: ["unsw-gsoe9210", "unsw-comp9814"] },
  { name: "Autonomous agents", area: "ai", usedIn: ["unsw-comp9814", "workflowpilot-safe-agents"] },
  { name: "Reinforcement learning", area: "ai", note: "TD learning, Q-learning, policy learning, deep RL.", usedIn: ["unsw-comp9814", "unsw-comp9444", "unsw-comp9727"] },

  // Classic ML (Extended AI, Andrew Ng)
  { name: "Linear & logistic regression", area: "ml", usedIn: ["andrew-ng-ml", "unsw-comp9814", "lab-nlp"] },
  { name: "Decision trees & random forests", area: "ml", usedIn: ["unsw-comp9814"] },
  { name: "SVMs & kernel methods", area: "ml", usedIn: ["unsw-comp9814", "lab-nlp", "andrew-ng-ml"] },
  { name: "Boosting & ensembles", area: "ml", usedIn: ["unsw-comp9814"] },
  { name: "k-NN", area: "ml", usedIn: ["unsw-comp9814"] },
  { name: "Clustering (k-means)", area: "ml", usedIn: ["unsw-comp9814", "andrew-ng-ml", "signaldesk-ai"] },
  { name: "PCA & dimensionality reduction", area: "ml", usedIn: ["unsw-comp9814", "interp"] },
  { name: "Bias-variance & learning theory", area: "ml", usedIn: ["unsw-comp9814", "unsw-comp9444"] },
  { name: "NumPy", area: "ml", icon: "siNumpy", usedIn: ["unsw-comp9814", "unsw-comp9444", "lab-nlp", "lab-llm"] },
  { name: "pandas", area: "ml", icon: "siPandas", usedIn: ["unsw-comp9814", "unsw-comp9727", "lab-nlp"] },

  // Deep learning
  { name: "Backpropagation", area: "ml", usedIn: ["unsw-comp9444", "andrew-ng-ml", "lab-nlp"] },
  { name: "Regularisation & generalisation", area: "ml", note: "Weight decay, momentum, overfitting control.", usedIn: ["unsw-comp9444", "unsw-comp9814"] },
  { name: "RNNs & LSTMs", area: "ml", usedIn: ["unsw-comp9444", "lab-nlp"] },
  { name: "Autoencoders", area: "ml", usedIn: ["unsw-comp9444"] },
  { name: "GANs & generative models", area: "ml", note: "Adversarial training and generative models.", usedIn: ["unsw-comp9444", "lab-llm"] },
  { name: "Computer vision", area: "ml", usedIn: ["unsw-comp9517", "unsw-comp9444", "unsw-comp9814", "inkers", "screensense-qa"] },

  // Recommender systems
  { name: "Collaborative filtering", area: "recsys", note: "Memory-based: user-user and item-item similarity.", usedIn: ["unsw-comp9727"] },
  { name: "Matrix factorisation", area: "recsys", note: "Model-based CF with latent factors.", usedIn: ["unsw-comp9727"] },
  { name: "Content-based recommenders", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "Learning to rank", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "Sequential recommenders", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "Group recommenders", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "Deep learning recommenders", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "RL for recommendation", area: "recsys", note: "Deep RL for sequential recommendation.", usedIn: ["unsw-comp9727"] },
  { name: "Association rules", area: "recsys", usedIn: ["unsw-comp9727"] },
  { name: "Recommender evaluation", area: "recsys", note: "Ranking metrics and offline evaluation.", usedIn: ["unsw-comp9727", "netflix-metrics"] },

  // Big data
  { name: "Hadoop", area: "data", icon: "siApachehadoop", usedIn: ["unsw-comp9313"] },
  { name: "MapReduce", area: "data", note: "Algorithm design in the map/reduce paradigm.", usedIn: ["unsw-comp9313"] },
  { name: "HDFS & YARN", area: "data", usedIn: ["unsw-comp9313"] },
  { name: "Apache Spark", area: "data", icon: "siApachespark", note: "In-memory distributed processing.", usedIn: ["unsw-comp9313"] },
  { name: "Data stream mining", area: "data", usedIn: ["unsw-comp9313"] },
  { name: "Similarity search at scale", area: "data", note: "Finding similar items across large data sets.", usedIn: ["unsw-comp9313", "signaldesk-ai"] },
  { name: "Graph data processing", area: "data", usedIn: ["unsw-comp9313"] },
  { name: "HBase", area: "data", icon: "siApachehbase", usedIn: ["unsw-comp9313"] },
  { name: "Hive", area: "data", icon: "siApachehive", usedIn: ["unsw-comp9313"] },
  { name: "NoSQL", area: "data", usedIn: ["unsw-comp9313"] },
  { name: "Distributed systems design", area: "data", usedIn: ["unsw-comp9313"] },

  // NLP coursework
  { name: "Text classification", area: "nlp", usedIn: ["unsw-comp6713", "lab-nlp"] },
  { name: "Language modelling", area: "nlp", usedIn: ["unsw-comp6713", "lab-nlp", "lab-llm"] },
  { name: "NLP evaluation", area: "nlp", usedIn: ["unsw-comp6713", "lab-nlp"] },

  // Computer vision
  { name: "Image processing", area: "ml", usedIn: ["unsw-comp9517"] },
  { name: "Feature detection & matching", area: "ml", usedIn: ["unsw-comp9517"] },
  { name: "Image segmentation", area: "ml", usedIn: ["unsw-comp9517"] },
  { name: "Motion & object tracking", area: "ml", usedIn: ["unsw-comp9517"] },
  { name: "Pattern recognition", area: "ml", usedIn: ["unsw-comp9517", "unsw-comp9814"] },

  // Databases
  { name: "ER & relational modelling", area: "backend", usedIn: ["unsw-comp9311"] },
  { name: "Normalisation", area: "backend", usedIn: ["unsw-comp9311"] },
  { name: "Transactions & concurrency", area: "backend", usedIn: ["unsw-comp9311"] },
  { name: "Indexing & query processing", area: "backend", usedIn: ["unsw-comp9311"] },
  { name: "PL/pgSQL, triggers & stored procedures", area: "backend", usedIn: ["unsw-comp9311"] },

  // Computer science
  { name: "Data structures & algorithms", area: "backend", usedIn: ["unsw-comp9024", "unsw-comp9021", "msruas"] },
  { name: "Graph algorithms", area: "backend", usedIn: ["unsw-comp9024", "unsw-comp9020", "unsw-comp9313"] },
  { name: "Complexity analysis", area: "backend", usedIn: ["unsw-comp9024", "unsw-comp9020"] },
  { name: "C", area: "backend", icon: "siC", usedIn: ["unsw-comp9024"] },
  { name: "Object-oriented programming", area: "backend", usedIn: ["unsw-comp9021", "msruas"] },
  { name: "Discrete maths & proofs", area: "backend", usedIn: ["unsw-comp9020"] },
  { name: "Probability & statistics", area: "ml", usedIn: ["unsw-comp9020", "unsw-comp9444", "unsw-gsoe9210"] },
  { name: "TCP/IP & networking", area: "backend", usedIn: ["unsw-comp9331", "unsw-comp6733"] },
  { name: "HTTP & DNS", area: "backend", usedIn: ["unsw-comp9331"] },
  { name: "Socket programming", area: "backend", usedIn: ["unsw-comp9331"] },

  // IoT
  { name: "Internet of Things", area: "delivery", note: "IoT design studio: a team build on Arduino.", usedIn: ["unsw-comp6733"] },
  { name: "Arduino", area: "delivery", icon: "siArduino", usedIn: ["unsw-comp6733"] },
  { name: "MicroPython", area: "delivery", icon: "siMicropython", usedIn: ["unsw-comp6733"] },
  { name: "Bluetooth Low Energy", area: "delivery", icon: "siBluetooth", usedIn: ["unsw-comp6733"] },
  { name: "IoT protocols (802.15.4, 6LoWPAN, CoAP)", area: "delivery", usedIn: ["unsw-comp6733"] },
  { name: "AWS IoT & cloud services", area: "delivery", usedIn: ["unsw-comp6733"] },
  { name: "Edge ML & sensor fusion", area: "ml", note: "Light-weight ML on device; inertial activity recognition.", usedIn: ["unsw-comp6733", "pedestal"] },

  // HCI, delivery, decisions, research
  { name: "Usability testing", area: "design", usedIn: ["unsw-comp9511"] },
  { name: "Prototyping", area: "design", usedIn: ["unsw-comp9511", "rekro-pm", "startmate"] },
  { name: "Heuristic evaluation", area: "design", usedIn: ["unsw-comp9511"] },
  { name: "Accessibility", area: "design", usedIn: ["unsw-comp9511"] },
  { name: "User research", area: "design", usedIn: ["unsw-comp9511", "pedestal", "rekro-pm"] },
  { name: "Project planning & scheduling", area: "leadership", usedIn: ["unsw-gsoe9820", "rekro-pm"] },
  { name: "Risk management", area: "leadership", usedIn: ["unsw-gsoe9820", "airbnb-redteam"] },
  { name: "Capstone team delivery", area: "leadership", usedIn: ["unsw-comp9900"] },
  { name: "Decision analysis", area: "product", note: "Decisions under risk, Bayesian updating, sequential decisions.", usedIn: ["unsw-gsoe9210", "netflix-metrics", "spotify-dj-launch"] },
  { name: "Game theory", area: "product", usedIn: ["unsw-gsoe9210"] },
  { name: "Social choice", area: "product", usedIn: ["unsw-gsoe9210"] },
  { name: "Literature review", area: "leadership", usedIn: ["unsw-gsoe9010", "interp"] },
  { name: "Technical writing", area: "leadership", usedIn: ["unsw-gsoe9010", ...PRODUCTS] },

  // NLP & LLM internals
  { name: "Tokenization", area: "nlp", usedIn: ["lab-nlp", "lab-llm"] },
  { name: "TF-IDF & classic classifiers", area: "nlp", note: "Naive Bayes, logistic regression, SVM.", usedIn: ["lab-nlp"] },
  { name: "N-gram language models", area: "nlp", usedIn: ["lab-nlp"] },
  { name: "Word2Vec / GloVe", area: "nlp", usedIn: ["lab-nlp", "unsw-comp9444", "unsw-comp6713"] },
  { name: "HMM, Viterbi, CRF", area: "nlp", usedIn: ["lab-nlp"] },
  { name: "Attention & Transformers", area: "nlp", note: "A tiny Transformer, by hand.", usedIn: ["lab-nlp", "lab-llm", "interp", "unsw-comp6713"] },
  { name: "RoPE / ALiBi", area: "nlp", usedIn: ["lab-llm"] },
  { name: "KV cache, MQA, GQA", area: "nlp", usedIn: ["lab-llm"] },
  { name: "Mixture of experts", area: "nlp", usedIn: ["lab-llm"] },
  { name: "Quantization & serving", area: "nlp", usedIn: ["lab-llm"] },
  { name: "Scaling laws & synthetic data", area: "nlp", usedIn: ["lab-llm"] },
  { name: "Machine translation & decoding", area: "nlp", usedIn: ["lab-nlp"] },
  { name: "NLP (coursework)", area: "nlp", usedIn: ["unsw-comp6713", "interp"] },

  // Retrieval & vectors
  { name: "Embeddings", area: "retrieval", usedIn: ["signaldesk-ai", "lab-nlp", "lab-llm", "unsw-comp9727"] },
  { name: "pgvector", area: "retrieval", icon: "siPostgresql", note: "Similarity search over user feedback.", usedIn: ["signaldesk-ai"] },
  { name: "Vector search", area: "retrieval", usedIn: ["signaldesk-ai", "lab-nlp"] },
  { name: "Semantic clustering", area: "retrieval", note: "Feedback grouped into themes before retrieval.", usedIn: ["signaldesk-ai"] },
  { name: "Source-grounded citations", area: "retrieval", usedIn: ["signaldesk-ai"] },

  // Product management
  { name: "Product discovery", area: "product", usedIn: ["pedestal", "rekro-pm", "startmate", "signaldesk-ai", "screensense-qa", "reforge"] },
  { name: "User interviews", area: "product", usedIn: ["pedestal", "rekro-pm", "startmate"] },
  { name: "PRD writing", area: "product", note: "One per product, plus a PRD that runs.", usedIn: ["pedestal", "rekro-pm", "canva-prd", ...PRODUCTS] },
  { name: "ICP & personas", area: "product", usedIn: [...PRODUCTS] },
  { name: "MVP scoping", area: "product", usedIn: ["pedestal", "rekro-pm", "startmate", ...PRODUCTS] },
  { name: "Roadmapping & OKRs", area: "product", usedIn: ["rekro-pm", "rekro-intern", "signaldesk-ai", "workflowpilot-safe-agents"] },
  { name: "Backlog prioritisation", area: "product", usedIn: ["rekro-pm"] },
  { name: "Opportunity sizing", area: "product", note: "Funnel models scored on user, business, and strategic value.", usedIn: ["reforge", "signaldesk-ai"] },
  { name: "Metrics & guardrails", area: "product", note: "North star, activation, retention, quality, guardrail.", usedIn: [...PRODUCTS, "netflix-metrics"] },
  { name: "A/B test readouts", area: "product", note: "Segments before the topline.", usedIn: ["netflix-metrics"] },
  { name: "Experiment design", area: "product", note: "Smoke and concierge tests before building.", usedIn: ["rekro-pm", "agenteval-studio", "signaldesk-ai", "reforge"] },
  { name: "Competitor analysis", area: "product", usedIn: ["rekro-pm"] },
  { name: "Launch planning & GTM", area: "product", usedIn: ["pedestal", "spotify-dj-launch", "agenteval-studio", "signaldesk-ai", "reforge"] },
  { name: "AI UX & trust design", area: "product", note: "Confidence labels, citations, approval gates.", usedIn: ["pedestal", "signaldesk-ai", "screensense-qa", "workflowpilot-safe-agents"] },
  { name: "AI product design", area: "product", usedIn: ["unsw-comp9511", "unsw", ...CASEWORK] },
  { name: "Trade-off narratives", area: "product", usedIn: [...PRODUCTS] },
  { name: "Feature lifecycle", area: "product", note: "Opportunity, design, development, launch.", usedIn: ["reforge"] },

  // TODO(JP): tag the skills you use at Enluma with "enluma".
  { name: "Healthcare AI products", area: "product", note: "Consult+, AI pre-consultation intake for specialist practices.", usedIn: ["enluma"] },
  { name: "Positioning & brand", area: "product", usedIn: ["pfc-2026", "pedestal"] },
  { name: "Pricing & packaging", area: "product", usedIn: ["pedestal"] },
  { name: "Founding a startup", area: "product", usedIn: ["pfc-2026", "pedestal", "startmate"] },

  // Front end
  { name: "React", area: "frontend", icon: "siReact", usedIn: ["bewakoof", "blue-sky", "rekro-intern", ...ALL_APPS] },
  { name: "Next.js", area: "frontend", icon: "siNextdotjs", note: "App Router across every app on this site.", usedIn: ["pedestal", "rekro-intern", ...ALL_APPS, ...CASEWORK] },
  { name: "TypeScript", area: "frontend", icon: "siTypescript", usedIn: ["pedestal", ...ALL_APPS, ...CASEWORK, "rekro-intern"] },
  { name: "JavaScript", area: "frontend", icon: "siJavascript", usedIn: ["bewakoof", "blue-sky", "freelance-moodle", "udacity"] },
  { name: "HTML & CSS", area: "frontend", icon: "siHtml5", usedIn: ["bewakoof", "udacity", "freelance-moodle"] },
  { name: "Tailwind CSS", area: "frontend", icon: "siTailwindcss", usedIn: [...ALL_APPS, ...CASEWORK] },
  // TODO(JP): confirm, Gatsby is named in the Blue Sky bullet; Redux is inferred for Bewakoof.
  { name: "Gatsby", area: "frontend", icon: "siGatsby", usedIn: ["blue-sky"] },
  { name: "Redux", area: "frontend", icon: "siRedux", usedIn: ["bewakoof"] },
  { name: "Webpack & code-splitting", area: "frontend", icon: "siWebpack", note: "JS bundle cut 20% with route-level lazy loading.", usedIn: ["bewakoof"] },
  { name: "Web performance", area: "frontend", icon: "siLighthouse", note: "Lighthouse Performance up 15%.", usedIn: ["bewakoof"] },
  { name: "Localization (i18n)", area: "frontend", note: "Led Shopping in Hindi.", usedIn: ["bewakoof"] },
  { name: "D3", area: "frontend", icon: "siD3", usedIn: ["blue-sky"] },
  { name: "MapLibre", area: "frontend", icon: "siMaplibre", note: "Satellite climate data on interactive maps.", usedIn: ["blue-sky"] },
  { name: "Recharts", area: "frontend", usedIn: ["pitchscore-ai"] },
  { name: "React Hook Form", area: "frontend", icon: "siReacthookform", usedIn: ["pitchscore-ai"] },
  { name: "Browser audio recording", area: "frontend", usedIn: ["pitchscore-ai"] },

  { name: "Flutter", area: "frontend", icon: "siFlutter", note: "Pedestal's iOS and Android app.", usedIn: ["pedestal"] },
  { name: "Dart", area: "frontend", icon: "siDart", usedIn: ["pedestal"] },
  { name: "iOS & Android", area: "frontend", icon: "siAndroid", note: "Native audio demux on both platforms, no ffmpeg.", usedIn: ["pedestal"] },
  { name: "GSAP", area: "frontend", icon: "siGreensock", usedIn: ["pedestal"] },

  // Back end & data
  { name: "Node.js", area: "backend", icon: "siNodedotjs", usedIn: ["blue-sky", ...ALL_APPS] },
  { name: "REST APIs", area: "backend", usedIn: ["blue-sky", "freelance-moodle", ...ALL_APPS] },
  // TODO(JP): confirm, Sequelize is named in the Blue Sky bullet; SQL is inferred.
  { name: "Sequelize", area: "backend", icon: "siSequelize", usedIn: ["blue-sky"] },
  { name: "SQL", area: "backend", usedIn: ["unsw-comp9311", "blue-sky", "signaldesk-ai", "pitchscore-ai"] },
  { name: "Supabase", area: "backend", icon: "siSupabase", usedIn: ["pedestal", "signaldesk-ai", "agenteval-studio", "pitchscore-ai"] },
  { name: "PostgreSQL", area: "backend", icon: "siPostgresql", usedIn: ["unsw-comp9311", "pedestal", "signaldesk-ai", "pitchscore-ai"] },
  { name: "Row Level Security", area: "backend", usedIn: ["pedestal", "pitchscore-ai"] },
  { name: "Convex", area: "backend", icon: "siConvex", usedIn: ["rekro-intern"] },
  { name: "Zod", area: "backend", icon: "siZod", usedIn: ["pitchscore-ai"] },
  // TODO(JP): confirm, PHP is inferred from building Moodle plugins and themes.
  { name: "PHP", area: "backend", icon: "siPhp", usedIn: ["freelance-moodle"] },
  { name: "Moodle plugins & APIs", area: "backend", icon: "siMoodle", note: "Automated enrolment, credentialing, reporting.", usedIn: ["freelance-moodle"] },
  { name: "Geospatial data", area: "backend", usedIn: ["blue-sky"] },
  { name: "Computer science foundations", area: "backend", note: "Data structures, algorithms, systems.", usedIn: ["msruas"] },

  { name: "Deno edge functions", area: "backend", icon: "siDeno", note: "Six Supabase functions: analysis, usage, compare, drills, billing.", usedIn: ["pedestal"] },
  { name: "In-app purchases", area: "backend", note: "Subscriptions with a server-side store webhook.", usedIn: ["pedestal"] },

  // Cloud & delivery
  { name: "Vercel", area: "delivery", icon: "siVercel", usedIn: ["pedestal", ...PRODUCTS, "pitchscore-ai"] },
  { name: "Docker", area: "delivery", icon: "siDocker", usedIn: ["pitchscore-ai"] },
  // TODO(JP): confirm, Git/GitHub inferred (every repo lives on github.com/devwithjp).
  { name: "Git & GitHub", area: "delivery", icon: "siGithub", usedIn: ["unsw-comp9900", "pedestal", ...ALL_APPS, "lab-nlp", "lab-llm", "rekro-pm", "bewakoof"] },
  { name: "Secret handling & mock-first", area: "delivery", note: "No keys in code; every demo runs without one.", usedIn: [...PRODUCTS] },
  { name: "PR review & prod merges", area: "delivery", usedIn: ["rekro-pm"] },
  { name: "Storage & file uploads", area: "delivery", usedIn: ["pitchscore-ai"] },

  // Testing
  { name: "Vitest", area: "testing", icon: "siVitest", usedIn: ["pitchscore-ai"] },
  { name: "Playwright", area: "testing", usedIn: ["pedestal", "pitchscore-ai"] },
  { name: "Deterministic eval checks", area: "testing", usedIn: ["agenteval-studio"] },
  { name: "Regression testing for prompts", area: "testing", usedIn: ["agenteval-studio"] },
  { name: "Performance audits", area: "testing", usedIn: ["bewakoof"] },

  { name: "pytest", area: "testing", icon: "siPytest", usedIn: ["pedestal"] },
  { name: "Mobile integration tests", area: "testing", note: "Full-loop drive on iPhone and Android emulators.", usedIn: ["pedestal"] },

  // Leadership & delivery
  { name: "Agile / Scrum", area: "leadership", usedIn: ["unsw-comp9900", "rekro-pm", "freelance-moodle"] },
  { name: "Linear", area: "leadership", icon: "siLinear", usedIn: ["rekro-pm"] },
  // TODO(JP): confirm, JIRA is named in the freelance bullet.
  { name: "Jira", area: "leadership", icon: "siJira", usedIn: ["unsw-comp9900", "freelance-moodle"] },
  { name: "Leading engineering teams", area: "leadership", note: "Six engineers; cycle time down about 20%.", usedIn: ["rekro-pm"] },
  { name: "Mentoring", area: "leadership", usedIn: ["freelance-moodle", "swim-teacher"] },
  { name: "Stakeholder communication", area: "leadership", usedIn: ["unsw-gsoe9820", "rekro-pm", "rekro-intern", "reforge"] },
  { name: "Pitching", area: "leadership", usedIn: ["pfc-2026", "pedestal", "startmate", "peter-farrell"] },
  { name: "Strategic thinking", area: "leadership", usedIn: ["unsw-leadership", "freelance-moodle"] },
  { name: "Teaching", area: "leadership", usedIn: ["swim-teacher"] },
  { name: "Team research", area: "leadership", usedIn: ["unsw-gsoe9010", "interp"] },

  // Design
  { name: "Figma", area: "design", icon: "siFigma", usedIn: ["rekro-pm", "udacity"] },
  { name: "UX design", area: "design", usedIn: ["unsw-comp9511", "udacity", "rekro-pm", ...CASEWORK] },
  { name: "Interactive product demos", area: "design", note: "Five case studies you play, not read.", usedIn: [...CASEWORK] },
  { name: "Data visualization", area: "design", usedIn: ["blue-sky", "pitchscore-ai", "netflix-metrics"] },
];

// ---- University and personal builds -------------------------------------------
// Each project links back to the subject it came from, so coursework connects to work.

const SMARTCARE = ["smartcare-imu", "unsw-comp9900"];
const GERMINATION = ["germination-chamber", "unsw-comp6733"];
const RECIPES = ["health-aware-recipes", "unsw-comp9727"];

skills.push(
  { name: "FastAPI", area: "backend", icon: "siFastapi", usedIn: [...SMARTCARE] },
  { name: "IMU signal processing", area: "ml", note: "Resampling, quality gates, 135 features per window.", usedIn: [...SMARTCARE] },
  { name: "Human activity recognition", area: "ml", note: "MLP classifier; macro-F1 0.774 on held-out subjects.", usedIn: [...SMARTCARE] },
  { name: "Explainable risk alerts", area: "evals", note: "Alerts fire on sustained change from a personal baseline.", usedIn: [...SMARTCARE] },
  { name: "Docker Compose", area: "delivery", icon: "siDocker", usedIn: [...SMARTCARE] },
  { name: "ESP32", area: "delivery", icon: "siEspressif", usedIn: [...GERMINATION] },
  { name: "Raspberry Pi", area: "delivery", icon: "siRaspberrypi", usedIn: [...GERMINATION] },
  { name: "MQTT", area: "delivery", icon: "siMqtt", usedIn: [...GERMINATION] },
  { name: "Home Assistant", area: "delivery", icon: "siHomeassistant", usedIn: [...GERMINATION] },
  { name: "Sensor calibration", area: "delivery", note: "Per-sensor calibration for soil sensor drift.", usedIn: [...GERMINATION] },
  { name: "3D-printed enclosures (OpenSCAD)", area: "design", usedIn: [...GERMINATION] },
  { name: "Hybrid recommenders", area: "recsys", note: "Reciprocal rank fusion over content, CF and nutrition rankers.", usedIn: [...RECIPES] },
  { name: "Health-aware re-ranking", area: "recsys", note: "Nudging toward healthier recipes; reported as a negative result.", usedIn: [...RECIPES] },
  { name: "Ranking & voting systems", area: "product", note: "Relevance, votes with a 180-day half-life, repo health, popularity.", usedIn: ["gitit"] },
  { name: "MCP servers", area: "llm", note: "gitit ships an MCP server, a CLI and a Claude Code plugin.", usedIn: ["gitit"] },
  { name: "GraphQL", area: "backend", icon: "siGraphql", note: "Batched GitHub GraphQL: 54x faster ingestion than REST.", usedIn: ["gitit"] },
  { name: "Drizzle ORM", area: "backend", icon: "siDrizzle", usedIn: ["gitit"] },
  { name: "Monorepos (pnpm)", area: "delivery", icon: "siPnpm", usedIn: ["gitit"] },
  { name: "FFmpeg & audio processing", area: "backend", icon: "siFfmpeg", note: "Loudness matched to -16 LUFS; swim EQ presets.", usedIn: ["poolside"] },
);

// Existing skills these builds also used.
const ALSO: Record<string, string[]> = {
  Python: ["smartcare-imu", "germination-chamber", "health-aware-recipes", "poolside"],
  PyTorch: ["smartcare-imu"],
  React: ["smartcare-imu"],
  PostgreSQL: ["smartcare-imu", "gitit"],
  Supabase: ["smartcare-imu"],
  Docker: ["smartcare-imu"],
  "Next.js": ["gitit"],
  TypeScript: ["gitit"],
  pgvector: ["gitit"],
  Jupyter: ["health-aware-recipes"],
  "Agile / Scrum": ["smartcare-imu"],
  "Git & GitHub": ["smartcare-imu", "germination-chamber", "gitit"],
  "Internet of Things": ["germination-chamber"],
  Arduino: ["germination-chamber"],
  "Bluetooth Low Energy": ["germination-chamber"],
  "Edge ML & sensor fusion": ["smartcare-imu", "germination-chamber"],
  "Computer vision": ["germination-chamber"],
  "Collaborative filtering": ["health-aware-recipes"],
  "Content-based recommenders": ["health-aware-recipes"],
  "Deep learning recommenders": ["health-aware-recipes"],
  "Recommender evaluation": ["health-aware-recipes"],
  "TF-IDF & classic classifiers": ["health-aware-recipes"],
};
for (const [name, ids] of Object.entries(ALSO)) {
  const skill = skills.find((s) => s.name === name);
  if (!skill) throw new Error(`skill-graph: ALSO names unknown skill "${name}"`);
  skill.usedIn.push(...ids.filter((id) => !skill.usedIn.includes(id)));
}

// ---- Derived -------------------------------------------------------------------

export const sourceById = new Map(sources.map((s) => [s.id, s]));

export const skillSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const skillsForSource = (id: string) => skills.filter((s) => s.usedIn.includes(id));

export const skillStats = {
  skills: skills.length,
  work: sources.filter((s) => s.kind === "work").length,
  projects: sources.filter((s) => s.kind === "project" || s.kind === "casework" || s.kind === "lab").length,
  learning: sources.filter((s) => s.kind === "education" || s.kind === "course").length,
};

// Fail the build if a skill points at a source that does not exist.
for (const s of skills) {
  for (const id of s.usedIn) {
    if (!sourceById.has(id)) throw new Error(`skill-graph: "${s.name}" references unknown source "${id}"`);
  }
}
