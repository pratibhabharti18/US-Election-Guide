import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vote, 
  CalendarDays, 
  Users, 
  Landmark, 
  MessageSquare, 
  CheckCircle2, 
  Award,
  ExternalLink,
  Info,
  ChevronRight,
  BookOpen,
  MapPin,
  Mail,
  Clock
} from 'lucide-react';

const electionPhases = [
  {
    id: 'primaries',
    title: 'Primaries & Caucuses',
    timeframe: 'January - June',
    icon: Users,
    color: 'bg-blue-500',
    description: 'The process begins with states holding primary elections and caucuses to determine which candidates will represent each political party in the general election.',
    details: [
      { title: 'Primaries', text: 'Voters go to the polls to cast secret ballots for their preferred candidate, similar to a general election.' },
      { title: 'Caucuses', text: 'Local gatherings where voters openly discuss and decide which candidate to support through physically grouping together.' },
      { title: 'Delegates', text: 'These events determine how many "delegates" each candidate receives. A candidate needs a majority of delegates to win the nomination.' }
    ]
  },
  {
    id: 'conventions',
    title: 'National Conventions',
    timeframe: 'July - August',
    icon: Landmark,
    color: 'bg-indigo-500',
    description: 'Political parties hold massive national conventions to officially nominate their candidates for President and Vice President.',
    details: [
      { title: 'Official Nomination', text: 'Delegates chosen during the primaries/caucuses formally cast their votes to secure the nominee.' },
      { title: 'Running Mate', text: 'The presidential nominee officially announces their Vice Presidential running mate.' },
      { title: 'Party Platform', text: 'The party adopts its official platform, outlining its goals and policy priorities for the upcoming term.' }
    ]
  },
  {
    id: 'campaign',
    title: 'General Election Campaign',
    timeframe: 'September - October',
    icon: MessageSquare,
    color: 'bg-purple-500',
    description: 'The final stretch where nominated candidates campaign nationwide, participating in town halls, rallies, and televised debates.',
    details: [
      { title: 'Debates', text: 'Candidates typically participate in a series of televised debates to discuss policy and contrast their platforms.' },
      { title: 'Campaigning', text: 'Intensive travel, particularly to "swing states" where the outcome is highly competitive.' },
      { title: 'Early Voting', text: 'Many states begin allowing voters to cast their ballots early, either by mail or in person.' }
    ]
  },
  {
    id: 'election-day',
    title: 'Election Day',
    timeframe: 'Early November',
    icon: Vote,
    color: 'bg-rose-500',
    description: 'By law, Election Day is held on the Tuesday following the first Monday in November. Millions of Americans cast their final votes.',
    details: [
      { title: 'The Popular Vote', text: 'Citizens vote for their preferred ticket. While important, the national popular vote does not directly elect the President.' },
      { title: 'Slate of Electors', text: 'Technically, voters are choosing a "slate of electors" who have pledged to vote for that candidate in the Electoral College.' },
      { title: 'Outcome Projection', text: 'Media outlets project winners on election night, but official certification takes weeks.' }
    ]
  },
  {
    id: 'electoral-college',
    title: 'Electoral College Votes',
    timeframe: 'Mid-December',
    icon: CheckCircle2,
    color: 'bg-emerald-500',
    description: 'The final formal step in electing the President, where electors gather in their respective states to officially cast their votes.',
    details: [
      { title: 'The Meeting', text: 'Electors meet in their state capitols on the first Tuesday after the second Wednesday in December.' },
      { title: '270 to Win', text: 'A candidate must receive an absolute majority of electoral votes (currently 270 out of 538) to win the presidency.' },
      { title: 'Faithless Electors', text: 'In rare cases, electors vote for someone other than whom they pledged, though many states have laws against this.' }
    ]
  },
  {
    id: 'inauguration',
    title: 'Inauguration Day',
    timeframe: 'January 20th',
    icon: Award,
    color: 'bg-amber-500',
    description: 'The President-elect and Vice President-elect take the Oath of Office and officially begin their four-year term.',
    details: [
      { title: 'The Oath', text: 'Administered by the Chief Justice of the Supreme Court at the US Capitol.' },
      { title: 'The Address', text: 'The newly sworn-in President delivers an inaugural address outlining their vision.' },
      { title: 'Transition of Power', text: 'Marks the peaceful transfer of power, a hallmark of American democracy.' }
    ]
  }
];

const officialResources = [
  {
    title: 'Register to Vote',
    description: 'Check your registration status or register to vote in your state.',
    url: 'https://vote.gov/',
    domain: 'vote.gov'
  },
  {
    title: 'Find Your Polling Place',
    description: 'Locate where to cast your ballot on Election Day or during early voting.',
    url: 'https://www.vote.org/polling-place-locator/',
    domain: 'vote.org'
  },
  {
    title: 'Campaign Finance Data',
    description: 'Explore official data on how political campaigns are funded.',
    url: 'https://www.fec.gov/',
    domain: 'fec.gov'
  }
];

const votingMethods = [
  {
    id: 'election-day',
    title: 'Election Day In-Person',
    timeframe: 'November 5th',
    icon: Vote,
    color: 'bg-emerald-600',
    description: 'Vote traditionally at your assigned local polling place on the official Election Day. Polls are typically open from early morning until evening.',
    details: [
      { title: 'Confirm Location', text: 'Polling places can change. Verify your assigned location before heading out to vote.' },
      { title: 'Bring Proper ID', text: 'Many states require a valid form of identification, such as a driver\'s license or state ID. Check your state\'s specific requirements.' },
      { title: 'Your Rights', text: 'If you are in line when the polls close, you legally have the right to vote. Stay in line!' }
    ]
  },
  {
    id: 'early-voting',
    title: 'Early In-Person',
    timeframe: 'Dates Vary by State',
    icon: Clock,
    color: 'bg-amber-500',
    description: 'Cast your ballot in person before Election Day. This helps avoid long lines and offers flexibility with dates and times.',
    details: [
      { title: 'Check Dates', text: 'Early voting periods vary widely. Some begin a month before the election, while others offer only a few days.' },
      { title: 'Designated Centers', text: 'Early voting locations often differ from regular polling places. Look up early voting centers in your county.' },
      { title: 'Less Hassle', text: 'Wait times are generally shorter, bringing the satisfaction of casting your ballot securely in person.' }
    ]
  },
  {
    id: 'mail-in',
    title: 'Mail-In / Absentee',
    timeframe: 'Return by Election Day',
    icon: Mail,
    color: 'bg-blue-500',
    description: 'Receive your ballot by mail, complete it at home, and return it via postal mail or an official secure drop box.',
    details: [
      { title: 'Requesting a Ballot', text: 'While some states automatically mail ballots, in others you must request an absentee ballot in advance.' },
      { title: 'Instructions (Crucial)', text: 'Use a black or blue pen. Completely fill in the ovals. IMPORTANT: You must sign the outside of the return envelope.' },
      { title: 'Return Deadlines', text: 'Return it ASAP. Check if your state requires it to be postmarked by Election Day, or received by Election Day.' }
    ]
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<'timeline' | 'how-to-vote'>('how-to-vote');
  const [activePhase, setActivePhase] = useState(electionPhases[0].id);
  const [activeMethod, setActiveMethod] = useState(votingMethods[0].id);

  const isTimeline = activeView === 'timeline';
  const dataList = isTimeline ? electionPhases : votingMethods;
  const activeItemId = isTimeline ? activePhase : activeMethod;
  const setActiveItem = isTimeline ? setActivePhase : setActiveMethod;

  const currentItem = dataList.find(p => p.id === activeItemId) || dataList[0];
  const activeItemIndex = dataList.findIndex(p => p.id === activeItemId);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <nav className="h-16 px-4 md:px-8 flex items-center justify-between bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center rounded-sm">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="font-bold tracking-tight text-lg uppercase">CivicNav 2024</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <button 
            onClick={() => setActiveView('timeline')}
            className={`transition-colors ${isTimeline ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'}`}
          >
            Timeline
          </button>
          <button 
            onClick={() => setActiveView('how-to-vote')}
            className={`transition-colors ${!isTimeline ? 'text-indigo-600 font-bold' : 'hover:text-indigo-600'}`}
          >
            How to Vote
          </button>
          <a href="https://www.vote.org/polling-place-locator/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Find Polling Place
          </a>
        </div>
        <a 
          href="https://vote.gov" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-sm hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Register Now
        </a>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row gap-px bg-slate-200">
        
        {/* Left Aside - Navigation */}
        <aside className="w-full lg:w-72 bg-white flex flex-col shrink-0 p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            {isTimeline ? 'Your Progress' : 'Voting Methods'}
          </h2>
          <div className="flex-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 gap-2 lg:gap-0">
            {dataList.map((item, index) => {
              const isActive = item.id === activeItemId;
              const isPast = isTimeline ? index <= activeItemIndex : false;
              const isLast = index === dataList.length - 1;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`relative text-left flex-shrink-0 transition-all group outline-none
                    /* Desktop */
                    lg:w-full lg:block lg:pl-8 lg:p-0 lg:rounded-none lg:border-none lg:bg-transparent lg:shadow-none
                    ${!isLast ? 'lg:pb-8' : 'lg:pb-0'}
                    /* Mobile */
                    px-4 py-3 rounded-sm border
                    ${isActive ? 'bg-white border-indigo-600 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}
                  `}
                >
                  {/* Desktop Line */}
                  <div className={`hidden lg:block absolute left-0 top-0 w-0.5 h-full ${
                    isLast ? 'bg-transparent' : 
                    (isPast || (isActive && !isTimeline)) ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}></div>

                  {/* Desktop Dot */}
                  <div className={`hidden lg:block absolute -left-[7px] top-0 w-4 h-4 rounded-full ring-4 transition-colors z-10 ${
                    isActive ? 'bg-indigo-600 ring-white' : 
                    isPast ? 'bg-indigo-600 ring-white' : 'bg-white ring-slate-200 border-2 border-slate-200 group-hover:border-indigo-400'
                  }`}></div>

                  <h3 className={`text-sm font-bold leading-none transition-colors ${
                    isActive ? 'lg:text-indigo-600 text-indigo-700' : 
                    isPast ? 'text-slate-900 group-hover:text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors ${
                    isActive ? 'lg:text-indigo-500 text-indigo-600' : 
                    isPast ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {item.timeframe}
                  </p>
                </button>
              );
            })}
          </div>
          
          <div className="hidden lg:block mt-8 bg-slate-50 p-4 rounded-sm border border-slate-200">
            <p className="text-xs font-semibold text-slate-400 uppercase">Election Year</p>
            <p className="text-3xl font-black text-indigo-600">2024</p>
          </div>
        </aside>

        {/* Center Section - Detail View */}
        <section className="flex-1 bg-white p-6 md:p-8 lg:p-12 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-sm text-white ${currentItem.color}`}>
                     <currentItem.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {isTimeline ? `Step ${activeItemIndex + 1} of ${dataList.length}` : 'Voting Guide'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">{currentItem.title}</h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {currentItem.description}
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {currentItem.details.slice(0, 2).map((detail, idx) => (
                  <div key={idx} className="p-6 border border-slate-200 rounded-sm hover:border-indigo-600 transition-colors bg-white group cursor-default">
                    <h4 className="font-bold mb-2 text-slate-900 group-hover:text-indigo-700 transition-colors">{detail.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">
                      {detail.text}
                    </p>
                  </div>
                ))}
              </div>

              {currentItem.details.length > 2 && (
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6">
                  <h4 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-indigo-600" />
                    Pro Tip: {currentItem.details[2].title}
                  </h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    {currentItem.details[2].text}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Right Aside - Official Resources */}
        <aside className="w-full lg:w-80 bg-slate-50 flex flex-col shrink-0 p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Official Resources
          </h2>
          <div className="space-y-4">
            {officialResources.map((resource, idx) => (
              <a 
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-4 bg-white border border-slate-200 rounded shadow-sm hover:border-indigo-400 transition-all"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pr-2">
                    {resource.title}
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-slate-500 leading-snug mb-3">
                  {resource.description}
                </p>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {resource.domain}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-8 lg:mt-auto">
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
              <div className="w-12 h-1 bg-red-500 mb-4"></div>
              <p className="text-xs font-bold uppercase mb-2 text-slate-900">Need Help?</p>
              <p className="text-sm text-slate-600 mb-4 leading-snug">Call the National Voter Hotline for nonpartisan assistance in multiple languages.</p>
              <p className="text-lg font-bold text-slate-900 tracking-tight">1-866-OUR-VOTE</p>
            </div>
          </div>
        </aside>

      </main>

      {/* Footer */}
      <footer className="h-12 bg-white border-t border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
          © 2024 Civic Assistant Tool • Non-Partisan Resource
        </p>
        <div className="hidden md:flex gap-4">
          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
        </div>
      </footer>
    </div>
  );
}
