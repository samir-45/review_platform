import React, { useState, useMemo, useEffect } from "react";
import { button } from "framer-motion/client";


function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      console.error(e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [key, state]);

  return [state, setState];
}

const Star = ({ filled, onClick }) => (
  <button
    onClick={onClick}
    className="focus:outline-none transform hover:scale-110 transition-transform duration-150"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    >
      <path
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 
        0l1.286 3.957a1 1 0 00.95.69h4.162c.969 
        0 1.371 1.24.588 1.81l-3.37 2.45a1 1 
        0 00-.364 1.118l1.287 3.957c.3.921-.755 
        1.688-1.54 1.118l-3.37-2.45a1 1 
        0 00-1.175 0l-3.37 2.45c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 
        1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 
        1 0 00.95-.69l1.286-3.957z"
      />
    </svg>
  </button>
);

const StarRatingInput = ({ value, onChange }) => (
  <div className="flex gap-1 items-center">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star type={button} key={n} filled={n <= value} onClick={() => onChange(n)} />
    ))}
  </div>
);

const formatDate = (ts) => {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
};




function ReviewSection() {
  const [reviews, setReviews] = useLocalStorage("reviews", []);
  const [shopName, setShopName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);

  const [query, setQuery] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shopName.trim() || !reviewText.trim()) return;

    if (editingId) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, shopName, reviewText, rating, updatedAt: Date.now() }
            : r
        )
      );
      setEditingId(null);
    } else {
      setReviews((prev) => [
        { id: Date.now(), shopName: shopName.trim(), reviewText: reviewText.trim(), rating, createdAt: Date.now() },
        ...prev,
      ]);
    }

    setShopName("");
    setReviewText("");
    setRating(5);
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setShopName(review.shopName);
    setReviewText(review.reviewText);
    setRating(review.rating);
  };

  const remove = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const filtered = useMemo(() => {
    let list = [...reviews];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (rev) =>
          rev.shopName.toLowerCase().includes(q) ||
          rev.reviewText.toLowerCase().includes(q)
      );
    }

    if (filterRating > 0) list = list.filter((rev) => rev.rating === filterRating);

    if (sortBy === "newest") list.sort((a, b) => b.createdAt - a.createdAt);
    else if (sortBy === "oldest") list.sort((a, b) => a.createdAt - b.createdAt);
    else if (sortBy === "rating_desc") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "rating_asc") list.sort((a, b) => a.rating - b.rating);

    return list;
  }, [reviews, query, filterRating, sortBy]);



  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2);
  }, [reviews]);

  return (
    <div className="relative bg-gradient-to-b text-slate-800 bg-white/10 backdrop-blur-md border-b border-white/10 shadow rounded-2xl p-6 md:px-2 md:py-8 w-11/12  mx-auto z-50">
      <div className="max-w-5xl mx-auto">

      {/* ------------------------------------------------------------------------------ */}

        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              ShopReview - Online Shop Experience
            </h1>
            <p className="text-sm text-slate-500">
              Submit honest reviews and browse community feedback.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Reviews</div>
            <div className="text-lg font-semibold">{reviews.length}</div>
            <div className="text-sm text-slate-400">Avg ∙ {avgRating} ⭐</div>
          </div>
        </header>

        {/* ----------------------------------------------------------------------------- */}

        {/* Form Content*/}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Shop Name
              </label>
              {/* Shop name input */}
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="mt-2 block w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-200 focus:border-transparent"
                placeholder="e.g. QuickKart or TrendyStore"
              />

              <label className="block text-sm font-medium text-slate-700 mt-4">
                Review
              </label>
              {/* Review text area */}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                className="mt-2 block w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-slate-200 focus:border-transparent"
                placeholder="What was your experience? delivery time, packaging, product quality..."
              />

            </div>

            <div className="flex flex-col gap-4">
                
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Rating
                </label>
                {/* Review starts */}
                <div className="mt-2">
                  <StarRatingInput type={button} value={rating} onChange={setRating} />
                </div>

              </div>

              {/* Buttons for Review Submission */}
              <div className="flex gap-2 mt-auto">
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-slate-900 text-white rounded-lg shadow hover:opacity-95"
                >
                  {editingId ? "Update Review" : "Submit Review"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setShopName("");
                      setReviewText("");
                      setRating(5);
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

              </div>

              <div className="text-xs text-slate-400">
                Pro tip: edit reviews to keep them accurate as shops change.
              </div>
            </div>
          </div>
        </form>

        {/* --------------------------------------------------------------------------- */}

        {/* Filters */}
        <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex gap-2 items-center w-full md:w-1/2">
            {/* Search input */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by shop or text..."
              className="flex-1 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-200"
            />
            {/* Filter by rating */}
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="border border-slate-200 rounded-lg p-2"
            >
              <option value={0}>All ratings</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>

            {/* Sort by newest - oldest || Lowest - Highest */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-lg p-2"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="rating_desc">Rating: High → Low</option>
              <option value="rating_asc">Rating: Low → High</option>
            </select>

          </div>

          <div className="text-sm text-slate-500">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{reviews.length}</strong>
          </div>
        </section>

        {/* --------------------------------------------------------------------------------- */}

        {/* Review List */}
        <main className="grid gap-4">
            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 py-12 bg-white rounded-2xl shadow-sm"
              >
                No reviews yet. Be the first to add one!
              </p>
            ) : (
              filtered.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-full md:w-56">
                    <div className="text-sm text-slate-500">Shop</div>
                    <div className="font-semibold text-lg">{review.shopName}</div>

                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={i < review.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 
                            0l1.286 3.957a1 1 0 00.95.69h4.162c.969 
                            0 1.371 1.24.588 1.81l-3.37 2.45a1 1 
                            0 00-.364 1.118l1.287 3.957c.3.921-.755 
                            1.688-1.54 1.118l-3.37-2.45a1 1 
                            0 00-1.175 0l-3.37 2.45c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 
                            1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 
                            1 0 00.95-.69l1.286-3.957z"
                          />
                        </svg>
                      ))}
                      <span className="text-xs text-slate-400 ml-2">
                        {review.rating}/5
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 mt-4">

                      {formatDate(review.createdAt)}{" "}

                      {review.updatedAt && (
                        <span> • updated {formatDate(review.updatedAt)}</span>
                      )}

                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-slate-700">{review.reviewText}</p>

                    <div className="mt-4 flex gap-2 items-center">

                      <button
                      type="button"
                        onClick={() => startEdit(review)}
                        className="text-sm px-3 py-1 border border-slate-200 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => remove(review.id)}
                        className="text-sm px-3 py-1 border border-red-100 text-red-600 rounded-lg"
                      >
                        Delete
                      </button>
                      <div className="ml-auto text-xs text-slate-400">
                        ID: {review.id.toString().slice(-6)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
        </main>

      </div>
    </div>
  );
}

export default ReviewSection;
