import ReactionBar from "./reactionBar";
import CommentSection from "./commentBox";
import { Pin } from "lucide-react";

const getRelativeTime = (date) => {
  const diff = new Date(date).getTime() - new Date().getTime();
  const absDiff = Math.abs(diff);
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absDiff < minute) return rtf.format(Math.floor(diff / 1000), "second");
  if (absDiff < hour) return rtf.format(Math.floor(diff / minute), "minute");
  if (absDiff < day) return rtf.format(Math.floor(diff / hour), "hour");
  if (absDiff < month) return rtf.format(Math.floor(diff / day), "day");
  if (absDiff < year) return rtf.format(Math.floor(diff / month), "month");
  return rtf.format(Math.floor(diff / year), "year");
};

export default function AnnouncementCard({ announcement }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
            {announcement.author?.name?.charAt(0) || "U"}
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-slate-900 leading-tight">
              {announcement.author?.name}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {getRelativeTime(new Date(announcement.createdAt))}
            </span>
          </div>
        </div>

        {announcement.isPinned && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
            <Pin className="h-3 w-3 text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">Pinned</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="font-black text-xl text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
        {announcement.title}
      </h2>

      {/* Content */}
      <div
        className="text-[15px] leading-relaxed text-slate-600 prose prose-slate max-w-none mb-6 prose-p:my-2 prose-strong:text-slate-900"
        dangerouslySetInnerHTML={{ __html: announcement.content }}
      />

      {/* Engagement Area */}
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <ReactionBar announcement={announcement} />
        
        <div className="bg-slate-50/50 rounded-2xl p-2">
          <CommentSection announcement={announcement} />
        </div>
      </div>
    </div>
  );
}
