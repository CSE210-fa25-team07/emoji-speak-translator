import json
from collections import defaultdict

def load_json(filename):
    """Load JSON file"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filename, data):
    """Save JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def check_duplicate_emojis(emoji_dict):
    """Check if there are duplicate emojis (same emoji appears multiple times)"""
    emoji_count = defaultdict(int)
    for emoji in emoji_dict.keys():
        emoji_count[emoji] += 1
    
    duplicates = {emoji: count for emoji, count in emoji_count.items() if count > 1}
    return duplicates

def check_duplicate_meanings(emoji_dict):
    """Check if there are duplicate meanings (multiple emojis with same meaning)"""
    meaning_to_emojis = defaultdict(list)
    
    for emoji, meaning in emoji_dict.items():
        meaning_to_emojis[meaning].append(emoji)
    
    duplicates = {meaning: emojis for meaning, emojis in meaning_to_emojis.items() 
                  if len(emojis) > 1}
    
    return duplicates

def check_multiple_word_meanings(emoji_dict):
    """Check if there are multi-word meanings"""
    multi_word = {}
    
    for emoji, meaning in emoji_dict.items():
        # Check if contains space (multiple words)
        if ' ' in meaning.strip():
            word_count = len(meaning.split())
            multi_word[emoji] = {
                "meaning": meaning,
                "word_count": word_count
            }
    
    return multi_word

def main():
    filename = 'dict.json'
    
    print("Checking emoji dictionary...")
    
    # Load data
    try:
        emoji_dict = load_json(filename)
        print(f"\n Successfully loaded {filename}")
        print(f"Total {len(emoji_dict)} emojis\n")
    except FileNotFoundError:
        print(f" Error: File {filename} not found")
        return
    except json.JSONDecodeError:
        print(f" Error: {filename} is not a valid JSON file")
        return
    
    # 1. Check duplicate emojis
    print("Check 1: Duplicate Emojis")
    duplicate_emojis = check_duplicate_emojis(emoji_dict)
    
    if duplicate_emojis:
        print(f"\n Found {len(duplicate_emojis)} duplicate emojis:\n")
        for emoji, count in duplicate_emojis.items():
            print(f"  {emoji}: appears {count} times")
    else:
        print("\n No duplicate emojis! All emojis are unique.")
    
    # 2. Check duplicate meanings
    print("Check 2: Duplicate Meanings")
    duplicate_meanings = check_duplicate_meanings(emoji_dict)
    
    if duplicate_meanings:
        print(f"\n Found {len(duplicate_meanings)} duplicate meanings:\n")
        for meaning, emojis in sorted(duplicate_meanings.items()):
            print(f"  \"{meaning}\" ({len(emojis)} emojis): {' '.join(emojis)}")
            for emoji in emojis:
                print(f"    {emoji}: \"{meaning}\"")
            print()
        
        # Save report
        report = {
            "duplicate_count": len(duplicate_meanings),
            "duplicates": duplicate_meanings
        }
        save_json('duplicate_meanings_report.json', report)
        print(f"✓ Detailed report saved to duplicate_meanings_report.json")
    else:
        print("\n No duplicate meanings! All meanings are unique.")
    
    # 3. Check multi-word meanings
    print("Check 3: Multi-Word Meanings")
    multi_word = check_multiple_word_meanings(emoji_dict)
    
    if multi_word:
        print(f"\n Found {len(multi_word)} multi-word meanings:\n")
        
        # Group by word count
        by_word_count = defaultdict(list)
        for emoji, info in multi_word.items():
            by_word_count[info['word_count']].append((emoji, info['meaning']))
        
        for word_count in sorted(by_word_count.keys()):
            items = by_word_count[word_count]
            print(f"  {word_count} words ({len(items)} emojis):")
            for emoji, meaning in sorted(items, key=lambda x: x[1]):
                print(f"    {emoji}: \"{meaning}\"")
            print()
        
        # Save report
        save_json('multi_word_meanings_report.json', multi_word)
        print(f"Detailed report saved to multi_word_meanings_report.json")
    else:
        print("\n All meanings are single words.")
    
    # Summary
    print("Check Complete - Summary")
    print(f"1. Duplicate emojis: {len(duplicate_emojis)}")
    print(f"2. Duplicate meanings: {len(duplicate_meanings)}")
    print(f"3. Multi-word meanings: {len(multi_word)}")

    
    if not duplicate_emojis and not duplicate_meanings and not multi_word:
        print("\n Dictionary is perfect!")
    else:
        print("\n Some issues found that need fixing.")

if __name__ == "__main__":
    main()